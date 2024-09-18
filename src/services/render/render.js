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

const TEMPLATE_PATH = process.env.TEMPLATE_PATH
const PhantomRenderer = Phantom.instance
console.log(TEMPLATE_PATH)
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

  app.post('/upload-template', upload.single('file'), async (req, res) => {
    try {
      const templateFile = req.file
      console.log(templateFile)

      if (!templateFile) {
        throw new Error('No template file uploaded')
      }

      // Clear the uploads directory
      try {
        const files = fs.readdir('uploads')
        for (const file of files) {
          const filePath = path.join('uploads', file)
          console.log(filePath)

          fs.rm(filePath, { recursive: true, force: true })
        }
      } catch (err) {
        console.error('Error clearing uploads directory:', err)
        throw new Error('Error clearing uploads directory')
      }

      const extractedPath = path.join('uploads')

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

      res.send('File uploaded and extracted successfully.')
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
      console.log(imageBuffer)
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
