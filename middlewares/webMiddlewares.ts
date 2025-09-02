import { type Request, Response, NextFunction } from 'express'
import config from '../config/index.js'

const assignDefaultMiddleWares = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals.currentPath = req.path
  res.locals.originalUrl = req.originalUrl
  // below env cause the minified of index.js which is bundle.js to be loaded in the browser only in production
  res.locals.env = config.environments
  next()
}

export { assignDefaultMiddleWares }
