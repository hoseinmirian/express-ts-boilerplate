import { z } from 'zod'
import { mongoObjectId } from './common.js'

const createCitySchema = {
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
    // as an optional field example we can define
    // country: z.string().optional()
  })
}

const updateCitySchema = {
  params: z.object({
    id: mongoObjectId
  }),
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
  })
}

const getCitySchema = {
  params: z.object({
    id: mongoObjectId
  })
}

const deleteCitySchema = {
  params: z.object({
    id: mongoObjectId
  })
}

export { createCitySchema, updateCitySchema, getCitySchema, deleteCitySchema }
