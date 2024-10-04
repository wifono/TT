import { RenderService } from './render.class.js'

export const renderPath = 'render'
export const renderMethods = ['create']

export * from './render.class.js'

import { Phantom } from '../render/renderPhantom.js'
import path from 'path'
import fs from 'fs'
import 'dotenv/config'
import multer from 'multer'
import unzip from 'unzipper'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

const PhantomRenderer = Phantom.instance
await PhantomRenderer.init()

export const render = (app) => {
  app.use(renderPath, new RenderService(), {
    methods: renderMethods
  })
  app.service(renderPath).hooks({
    around: {
      all: []
    }
  })

  const headers = {
    'Content-Type': 'image/png',
    'Content-Disposition': 'inline; filename="image.png"'
  }

  function cleanTempType(tempType) {
    return tempType.replace(/\s*\(.*?\)\s*/g, '').trim()
  }

  app.post('/upload-template', upload.single('template'), async (req, res) => {
    try {
      console.log('Receiving file...')
      const templateFile = req.file
      const tempType = req.body.tempType

      if (!templateFile) {
        throw new Error('No template file uploaded')
      }

      if (!tempType) {
        throw new Error('tempType not provided')
      }

      const cleanedTempType = cleanTempType(tempType)
      const extractedPath = path.join('uploads/', cleanedTempType)
      console.log('Extracting file to:', extractedPath)

      // Zisti, či priečinok existuje
      if (fs.existsSync(extractedPath)) {
        console.log(`Directory ${extractedPath} already exists. Clearing contents...`)

        const files = await fs.promises.readdir(extractedPath)

        for (const file of files) {
          const filePath = path.join(extractedPath, file)
          await fs.promises.rm(filePath, { recursive: true, force: true })
        }

        console.log(`Contents of ${extractedPath} cleared.`)
      } else {
        await fs.promises.mkdir(extractedPath, { recursive: true, mode: 0o755 })
        console.log('Directory created:', extractedPath)
      }

      await fs
        .createReadStream(templateFile.path)
        .pipe(unzip.Extract({ path: extractedPath }))
        .promise()

      console.log('File extracted successfully to:', extractedPath)

      fs.unlink(templateFile.path, (err) => {
        if (err) {
          console.error('Error deleting original zip file:', err)
        } else {
          console.log('Original zip file deleted successfully.')
        }
      })

      res.send({ filename: templateFile.originalname, extractedPath })
    } catch (error) {
      console.error('Error processing form data:', error)
      res.status(500).send('Error processing form data')
    }
  })

  app.post('/render-image', async (req, res) => {
    try {
      const opts = {
        mime: { png: 'image/png' },
        template: req.body.template,
        repeats: req.body.repeats,
        article: req.body.article,
        width: req.body.size.width,
        height: req.body.size.height
      }

      const imageBuffer = await PhantomRenderer.renderImage(opts)
      if (!Buffer.isBuffer(imageBuffer)) {
        throw new Error('imageBuffer is not a buffer object')
      }
      res.set(headers)
      res.send(imageBuffer)
    } catch (error) {
      console.error(error)
      res.status(400).send('Nejdze to.')
    }
  })
}
