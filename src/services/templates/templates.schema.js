// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const templatesSchema = {
  $id: 'Templates',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    path: { type: 'string' }
  }
}
export const templatesValidator = getValidator(templatesSchema, dataValidator)
export const templatesResolver = resolve({})

export const templatesExternalResolver = resolve({})

// Schema for creating new data
export const templatesDataSchema = {
  $id: 'TemplatesData',
  type: 'object',
  additionalProperties: false,
  required: ['path'],
  properties: {
    ...templatesSchema.properties
  }
}
export const templatesDataValidator = getValidator(templatesDataSchema, dataValidator)
export const templatesDataResolver = resolve({})

// Schema for updating existing data
export const templatesPatchSchema = {
  $id: 'TemplatesPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...templatesSchema.properties
  }
}
export const templatesPatchValidator = getValidator(templatesPatchSchema, dataValidator)
export const templatesPatchResolver = resolve({})

// Schema for allowed query properties
export const templatesQuerySchema = {
  $id: 'TemplatesQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(templatesSchema.properties)
  }
}
export const templatesQueryValidator = getValidator(templatesQuerySchema, queryValidator)
export const templatesQueryResolver = resolve({})
