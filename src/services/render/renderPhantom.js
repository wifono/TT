import phantom from 'phantom'
import amount from 'physical-cpu-count'

const singleton = Symbol()
const singletonEnforcer = Symbol()
const physicalCpuCount = amount

const PHANTOM_INSTANCES = 2

export class Phantom {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton')
    }
    console.info('Initializing renderer, count: ' + PHANTOM_INSTANCES)
    this.instances = parseInt(PHANTOM_INSTANCES)
    if (this.instances > physicalCpuCount * 2) {
      console.info('Physical CPU count low, setting new renderer count: ' + physicalCpuCount)
      this.instances = physicalCpuCount * 2
    }
    this.initialising = true

    this.counter = 0
    this.templates = {}
    this.templatesInUse = {}
    this.browsers = []
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Phantom(singletonEnforcer)
    }
    return this[singleton]
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  async init() {
    console.info('Renderer instances start')
    for (let i = 1; i <= this.instances; i++) {
      this.browsers.push(
        await phantom.create(['--local-url-access=true', '--disk-cache=true', '--max-disk-cache-size=10000'])
      )
    }
    await Promise.all(this.browsers)
  }

  getCounter() {
    if (this.counter >= this.instances) {
      this.counter = 0
    }
    return this.counter++ % this.instances
  }

  async initTemplate(template, opts) {
    this.initialising = true
    const phantomKey = opts._phantomKey
    const profilePath = opts.profilePath

    console.info(`Initializing template for profilePath: ${profilePath} - ${phantomKey}`)

    if (!this.templates[phantomKey]) {
      this.templates[phantomKey] = {}
      this.templatesInUse[phantomKey] = {}
    }

    if (!this.templates[phantomKey][profilePath]) {
      let temp = []
      let tempInUse = {}

      const settings = {
        top: 0,
        left: 0,
        width: opts.width,
        height: opts.height
      }

      try {
        for (let i = 0; i < this.instances; i++) {
          const filePath = `uploads/${profilePath}/${opts.template}/index.html`
          console.log(filePath)

          const pagePromise = this.browsers[i].createPage().then(async (page) => {
            await page.property('clipRect', settings)
            await page.property(
              'userAgent',
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
            )
            await page.property('dpi', '150')
            await page.open(filePath)
            await page.evaluate(function () {
              const style = document.createElement('style')
              const text = document.createTextNode(
                'body { background-color: #FFFFFF; -webkit-font-smoothing: none !important; }'
              )
              style.setAttribute('type', 'text/css')
              style.appendChild(text)
              document.head.insertBefore(style, document.head.firstChild)
            })

            temp.push(page)
            tempInUse[i] = false
          })

          await pagePromise
        }

        this.templates[phantomKey][profilePath] = temp
        this.templatesInUse[phantomKey][profilePath] = tempInUse

        await this.sleep(100)
        this.initialising = false
        return this.templates
      } catch (error) {
        console.error('Error initializing template:', error)
        this.initialising = false
        throw error
      }
    } else {
      console.info(`Template for profilePath ${profilePath} already initialized`)
      await this.sleep(100)
      this.initialising = false
      return this.templates[phantomKey][profilePath]
    }
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async getTemplate(template, opts) {
    const phantomKey = opts._phantomKey

    if (this.initialising) {
      await this.sleep(500)
      this.initialising = false
      return await this.getTemplate(template, opts)
    }

    const count = this.getCounter()
    if (!this.templates[phantomKey] || !this.templates[phantomKey][opts.profilePath]) {
      await this.initTemplate(template, opts)
    }

    if (this.templatesInUse[phantomKey][opts.profilePath][count] === false) {
      this.templatesInUse[phantomKey][opts.profilePath][count] = true
      return this.templates[phantomKey][opts.profilePath][count]
    }

    await this.sleep(this.getRandomInt(1, 10))
    return await this.getTemplate(template, opts)
  }

  async renderBase64(page, phantomKey, profilePath, count) {
    const image = await page.renderBase64('PNG')
    this.templatesInUse[phantomKey][profilePath][count] = false
    return image
  }

  async renderImage(opts) {
    try {
      const template = opts.template
      opts['_phantomKey'] = template + '_' + opts.width + 'x' + opts.height
      const phantomKey = opts._phantomKey

      const count = this.getCounter()
      const page = await this.getTemplate(template, opts)

      const data = opts.article

      await page.evaluate(function (args) {
        setPageData(args)
      }, data)

      const image = await this.renderBase64(page, phantomKey, opts.profilePath, count)
      return Buffer.from(image, 'base64')
    } catch (error) {
      console.error('Error rendering image:', error)
      throw error
    }
  }
}
