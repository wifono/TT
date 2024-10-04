import { profiles } from '../../profiles.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const profileHook = async (context) => {
  const allProfiles = profiles
  const profilesFilePath = path.resolve(__dirname, '../../profiles.js')

  if (context.method === 'find') {
    context.result = allProfiles
  }

  if (context.method === 'create') {
    const newProfile = context.data

    if (!newProfile.label || !newProfile.value) {
      throw new Error('Invalid profile data. Both label and value are required.')
    }
    console.log(newProfile)

    allProfiles.push(newProfile)

    const newFileContent = `export const profiles = ${JSON.stringify(allProfiles, null, 2)}\n`

    try {
      fs.writeFileSync(profilesFilePath, newFileContent, 'utf8')
      context.result = { success: true, message: 'Profile added successfully!' }
    } catch (err) {
      throw new Error('Error writing to profiles.js: ' + err.message)
    }
  }

  return context
}
