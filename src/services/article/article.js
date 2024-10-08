// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  articleDataValidator,
  articlePatchValidator,
  articleQueryValidator,
  articleResolver,
  articleExternalResolver,
  articleDataResolver,
  articlePatchResolver,
  articleQueryResolver
} from './article.schema.js'
import { ArticleService, getOptions } from './article.class.js'

export const articlePath = 'article'
export const articleMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './article.class.js'
export * from './article.schema.js'

import { createArticle, findArticle } from '../../hooks/articles.js'

// A configure function that registers the service and its hooks via `app.configure`
export const article = (app) => {
  // Register our service on the Feathers application
  app.use(articlePath, new ArticleService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: articleMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(articlePath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(articleExternalResolver), schemaHooks.resolveResult(articleResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(articleQueryValidator), schemaHooks.resolveQuery(articleQueryResolver)],
      find: [findArticle],
      get: [],
      create: [
        schemaHooks.validateData(articleDataValidator),
        schemaHooks.resolveData(articleDataResolver),
        createArticle
      ],
      patch: [schemaHooks.validateData(articlePatchValidator), schemaHooks.resolveData(articlePatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
