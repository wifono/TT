// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  profileDataValidator,
  profilePatchValidator,
  profileQueryValidator,
  profileResolver,
  profileExternalResolver,
  profileDataResolver,
  profilePatchResolver,
  profileQueryResolver
} from './profile.schema.js'
import { ProfileService, getOptions } from './profile.class.js'

export const profilePath = 'profile'
export const profileMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './profile.class.js'
export * from './profile.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const profile = (app) => {
  // Register our service on the Feathers application
  app.use(profilePath, new ProfileService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: profileMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(profilePath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(profileExternalResolver), schemaHooks.resolveResult(profileResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(profileQueryValidator), schemaHooks.resolveQuery(profileQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(profileDataValidator), schemaHooks.resolveData(profileDataResolver)],
      patch: [schemaHooks.validateData(profilePatchValidator), schemaHooks.resolveData(profilePatchResolver)],
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
