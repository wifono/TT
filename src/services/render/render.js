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

  app.post('/upload-folder', upload.array('files'), (req, res) => {
    try {
      const template = req.body.template
      const customer = req.query.customer
      const paths = req.body.paths
      const commonBasePath = path.dirname(paths[0])
      console.log('File Paths:', paths)

      if (!paths || paths.length === 0) {
        return res.status(400).json({ message: 'No files provided' })
      }

      const baseDirectory = path.join('uploads', customer, template)

      if (!fs.existsSync(baseDirectory)) {
        fs.mkdirSync(baseDirectory, { recursive: true })
        console.log(`Created directory: ${baseDirectory}`)
      }

      paths.forEach((filePath) => {
        const fileName = path.basename(filePath)

        const templateRoot = path.join('C:', 'Users', 'nov', 'Documents', 'james-templates')
        const relativeFilePath = path.relative(templateRoot, filePath)
        const destinationPath = path.join('uploads', relativeFilePath)
        console.log('Destination Path:', destinationPath)

        const destinationDir = path.dirname(destinationPath)
        if (!fs.existsSync(destinationDir)) {
          fs.mkdirSync(destinationDir, { recursive: true })
        }

        if (fs.existsSync(filePath)) {
          fs.copyFileSync(filePath, destinationPath)
          console.log(`Copied file: ${fileName} to ${destinationPath}`)
        } else {
          console.warn(`File not found: ${filePath}`)
        }
      })

      res.status(200).json({ message: 'Folder uploaded successfully.' })
    } catch (error) {
      console.error('Error uploading folder:', error)
      res.status(500).json({ message: 'Error uploading folder.' })
    }
  })

  app.post('/upload-folder', upload.array('files'), (req, res) => {
    try {
      console.log('Files uploaded:', req.files)

      res.status(200).json({ message: 'Priečinok úspešne nahratý.' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Chyba pri nahrávaní priečinku.' })
    }
  })

  app.get('/folder-files', async (req, res) => {
    const folderPath = decodeURIComponent(req.query.path)
    console.log(folderPath)

    const getAllFiles = (dirPath, arrayOfFiles) => {
      const files = fs.readdirSync(dirPath)

      arrayOfFiles = arrayOfFiles || []

      files.forEach((file) => {
        const filePath = path.join(dirPath, file)

        if (fs.statSync(filePath).isDirectory()) {
          arrayOfFiles = getAllFiles(filePath, arrayOfFiles)
        } else {
          arrayOfFiles.push(filePath)
        }
      })

      return arrayOfFiles
    }

    try {
      const allFiles = getAllFiles(folderPath)
      res.status(200).json({ files: allFiles })
    } catch (error) {
      console.error('Error reading folder:', error)
      res.status(500).send('Error reading folder')
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
        height: req.body.size.height,
        customer: req.body.customer
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
