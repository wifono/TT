// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const articleSchema = {
  $id: 'Article',
  type: 'object',
  additionalProperties: false,
  required: ['name'],
  properties: {
    name: { type: 'string' },
    articles: { type: 'string' }
  }
}
export const articleValidator = getValidator(articleSchema, dataValidator)
export const articleResolver = resolve({})

export const articleExternalResolver = resolve({})

// Schema for creating new data
export const articleDataSchema = {
  $id: 'ArticleData',
  type: 'object',
  additionalProperties: false,
  required: ['name'],
  properties: {
    ...articleSchema.properties
  }
}
export const articleDataValidator = getValidator(articleDataSchema, dataValidator)
export const articleDataResolver = resolve({})

// Schema for updating existing data
export const articlePatchSchema = {
  $id: 'ArticlePatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...articleSchema.properties
  }
}
export const articlePatchValidator = getValidator(articlePatchSchema, dataValidator)
export const articlePatchResolver = resolve({})

// Schema for allowed query properties
export const articleQuerySchema = {
  $id: 'ArticleQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(articleSchema.properties)
  }
}
export const articleQueryValidator = getValidator(articleQuerySchema, queryValidator)
export const articleQueryResolver = resolve({})
