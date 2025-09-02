import { type Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'

const isValidateID = (req: Request, res: Response, next: NextFunction) => {
  // web Middleware to validate ObjectId in request params
  const { id } = req.params
  if (!Types.ObjectId.isValid(id)) {
    return res.redirect('/error/404')
  }
  next()
}

export { isValidateID }
