import { z } from 'zod'
import { Types } from 'mongoose'

// Custom Zod validation for MongoDB ObjectID
const mongoObjectId = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid MongoDB ObjectID format'
  })

export { mongoObjectId }
