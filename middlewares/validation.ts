import { ZodSchema, ZodError } from 'zod'
import { type Request, Response, NextFunction } from 'express'
import { statuses } from '../utils/index.js'

// Middleware for validating request data using Zod schemas
const validateRequest = (schemas: {
  params?: ZodSchema
  query?: ZodSchema
  body?: ZodSchema
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate params if schema is provided
      if (schemas.params) {
        const parsedParams = schemas.params.safeParse(req.params)
        if (!parsedParams.success) {
          throw new ZodError(parsedParams.error.errors)
        }
        req.params = parsedParams.data // Assign validated data back to req.params
      }

      // Validate query if schema is provided
      if (schemas.query) {
        const parsedQuery = schemas.query.safeParse(req.query)
        if (!parsedQuery.success) {
          throw new ZodError(parsedQuery.error.errors)
        }
        req.query = parsedQuery.data // Assign validated data back to req.query
      }

      // Validate body if schema is provided
      if (schemas.body) {
        const parsedBody = schemas.body.safeParse(req.body)
        if (!parsedBody.success) {
          throw new ZodError(parsedBody.error.errors)
        }
        req.body = parsedBody.data // Assign validated data back to req.body
      }

      next() // Proceed to the next middleware/route handler
    } catch (error) {
      if (error instanceof ZodError) {
        // Send a 400 Bad Request response if validationSchemas fails
        res.status(statuses['Bad Request']).json({
          status: statuses['Bad Request'],
          message: 'Validation error',
          errors: error.errors.map((e) => ({
            path: e.path,
            message: e.message
          }))
        })
      } else {
        next(error) // Pass any other errors to the next error handler
      }
    }
  }
}

export { validateRequest }
