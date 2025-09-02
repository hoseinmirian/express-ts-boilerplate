import { type Request, Response, NextFunction } from 'express'
// cacheControl middleware: disable caching page per request (this is a good practice for dynamic pages as well as it is good when going back and forth in browser)
const noCache = (_req: Request, res: Response, next: NextFunction) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
  res.set('Pragma', 'no-cache')
  res.set('Expires', '0')
  next()
}

export { noCache }
