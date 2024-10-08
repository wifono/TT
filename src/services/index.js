import { article } from './article/article.js'
import { profile } from './profile/profile.js'
import { render } from './render/render.js'

export const services = (app) => {
  app.configure(article)

  app.configure(profile)

  app.configure(render)

  // All services will be registered here
}
