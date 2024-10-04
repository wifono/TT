// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const profileSchema = {
  $id: 'Profile',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'text'],
  properties: {
    id: { type: 'number' },
    text: { type: 'string' }
  }
}
export const profileValidator = getValidator(profileSchema, dataValidator)
export const profileResolver = resolve({})

export const profileExternalResolver = resolve({})

// Schema for creating new data
export const profileDataSchema = {
  $id: 'ProfileData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...profileSchema.properties
  }
}
export const profileDataValidator = getValidator(profileDataSchema, dataValidator)
export const profileDataResolver = resolve({})

// Schema for updating existing data
export const profilePatchSchema = {
  $id: 'ProfilePatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...profileSchema.properties
  }
}
export const profilePatchValidator = getValidator(profilePatchSchema, dataValidator)
export const profilePatchResolver = resolve({})

// Schema for allowed query properties
export const profileQuerySchema = {
  $id: 'ProfileQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(profileSchema.properties)
  }
}
export const profileQueryValidator = getValidator(profileQuerySchema, queryValidator)
export const profileQueryResolver = resolve({})
