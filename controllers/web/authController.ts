import { type Request, Response } from 'express'
import { asyncHandler, buildSeoTags } from '../../utils/index.js'
import { SEO_TAGS_PER_PATH } from '../../constants/index.js'

const renderSignUpPage = asyncHandler(async (_req: Request, res: Response) => {
  const seo = buildSeoTags(SEO_TAGS_PER_PATH['/sign-up'])
  res.render('pages/sign-up', { ...seo })
})

const renderLoginPage = asyncHandler(async (_req: Request, res: Response) => {
  const seo = buildSeoTags(SEO_TAGS_PER_PATH['/login'])
  res.render('pages/login', { ...seo })
})

export { renderSignUpPage, renderLoginPage }
