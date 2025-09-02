import {
  asyncHandler,
  buildSeoTags,
  statuses,
  type QueryString
} from '../../utils/index.js'
import { type Request, Response } from 'express'
import { SEO_TAGS_PER_PATH } from '../../constants/index.js'
import { cityService } from '../../services/index.js'
import { type ObjectId } from 'mongoose'

const index = asyncHandler(async (req: Request, res: Response) => {
  const cities = await cityService.getAll(req.query as QueryString)
  const seo = buildSeoTags(SEO_TAGS_PER_PATH['/cities'])
  // used to synchronously get query values and pass it to template for syncing the values of filters from query
  const getQueryValue = (key: string, fallback: unknown) => {
    const value = req.query[key]
    return value ?? fallback
  }

  res
    .status(statuses.OK)
    .render('pages/cities/index', { cities, ...seo, getQueryValue })
})

const show = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  const city = await cityService.getOne(id as unknown as ObjectId)
  if (!city) return res.status(statuses['Not Found']).redirect('/error/404')

  const seo = buildSeoTags(SEO_TAGS_PER_PATH['/cities'])
  res.status(statuses.OK).render('pages/cities/show', { city, ...seo })
})

const edit = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const city = await cityService.getOne(id as unknown as ObjectId)
  if (!city) return res.status(statuses['Not Found']).redirect('/error/404')

  const seo = buildSeoTags(SEO_TAGS_PER_PATH['/cities'])
  res.status(statuses.OK).render('pages/cities/edit', { city, ...seo })
})

const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const { name } = req.body
  await cityService.updateOne(id as unknown as ObjectId, { name })
  res.redirect(`/cities/${id}`)
})

const destroy = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  await cityService.deleteOne(id as unknown as ObjectId)
  res.redirect('/cities')
})

const create = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body
  const city = await cityService.createOne({ name })
  if (!city) return res.status(statuses['Not Found']).redirect('/error/404')
  res.redirect('/cities')
})

const New = asyncHandler(async (_req: Request, res: Response) => {
  const seo = buildSeoTags(SEO_TAGS_PER_PATH['/cities/new'])
  res.status(statuses.OK).render('pages/cities/new', { ...seo })
})

export { index, show, edit, update, destroy, create, New }
