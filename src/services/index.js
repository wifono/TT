import { templates } from './templates/templates.js'
import { render } from './render/render.js'

export const services = (app) => {
  app.configure(templates)

  app.configure(render)

  // All services will be registered here
}
