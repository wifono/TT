import { examples } from '../../src/examples.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const createArticle = async (context) => {
  const allExamples = examples
  const examplesFilePath = path.resolve(__dirname, 'src', '../../examples.js')

  if (context.method === 'create') {
    const newArticle = context.data

    if (!newArticle.name || !newArticle.articles) {
      throw new Error('Invalid example data. Both name and articles are required.')
    }

    if (typeof newArticle.articles === 'string') {
      try {
        newArticle.articles = JSON.parse(newArticle.articles)
        if (!Array.isArray(newArticle.articles)) {
          throw new Error()
        }
      } catch (error) {
        throw new Error('Invalid format for articles. It must be an array or a parsable JSON string.')
      }
    }

    allExamples.push(newArticle)

    const newFileContent = `export const examples = ${JSON.stringify(allExamples, null, 2)}\n`

    try {
      fs.writeFileSync(examplesFilePath, newFileContent, 'utf8')
      context.result = { success: true, message: 'Article added successfully!' }
    } catch (err) {
      throw new Error('Error writing to examples.js: ' + err.message)
    }
  }
}

export const findArticle = async (context) => {
  if (context.method === 'find') {
    const allExamples = examples
    context.result = allExamples
  }
}
