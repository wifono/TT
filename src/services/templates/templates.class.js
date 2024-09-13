import path from 'path'
import fs from 'fs/promises'

export class TemplatesService {
  constructor(options) {
    this.options = options
  }

  async find(_params) {
    const path = _params.query.path
    console.log(path)
    try {
      const items = await fs.readdir(path, { withFileTypes: true })
      console.log(items)
      return items
    } catch (error) {
      console.error(error)
    }

    return []
  }

  async get(id, _params) {
    return {
      id: 0,
      text: `A new message with ID: ${id}!`
    }
  }
  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)))
    }

    return {
      id: 0,
      ...data
    }
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id, data, _params) {
    return {
      id: 0,
      ...data
    }
  }

  async patch(id, data, _params) {
    return {
      id: 0,
      text: `Fallback for ${id}`,
      ...data
    }
  }

  async remove(id, _params) {
    return {
      id: 0,
      text: 'removed'
    }
  }
}

export const getOptions = (app) => {
  return { app }
}
