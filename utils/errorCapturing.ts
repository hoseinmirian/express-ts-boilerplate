import { type Request, Response, NextFunction } from 'express'
import { statuses } from './statuses.js'
import config from '../config/index.js'
import { ObjectId } from 'mongoose'

export interface CustomRequest extends Request {
  isWebRequest?: boolean
  user?: { id: ObjectId }
  file?: { filename: string }
}

class AppError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(
    statusCode: number,
    message: string,
    isOperational: boolean = true,
    stack: string = ''
  ) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

// Global error handler middleware
const globalErrorHandler = (
  err: AppError,
  req: CustomRequest,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || statuses['Internal Server Error']
  const message = err.message || 'Internal Server Error'

  // begin -- only runs for view routes (not api routes)
  const knownErrorStatuses = [401, 403, 404, 500]
  if (req.isWebRequest && knownErrorStatuses.includes(statusCode)) {
    return res.redirect(`/error/${statusCode}`)
  }
  // end -- only runs for view routes (not api routes)

  const response: Record<string, unknown> = {
    status: statusCode,
    message
  }

  console.error('Error:', {
    status: statusCode,
    message,
    ...(config.environments === 'development' && { stack: err.stack })
  })

  res.status(statusCode).json(response)
}

export { AppError, globalErrorHandler }
