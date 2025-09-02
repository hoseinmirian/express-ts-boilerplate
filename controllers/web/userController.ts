import {
  asyncHandler,
  buildSeoTags,
  statuses,
  type QueryString
} from '../../utils/index.js'
import { type Request, Response } from 'express'
import { SEO_TAGS_PER_PATH } from '../../constants/index.js'
import { userService } from '../../services/index.js'
import { type ObjectId } from 'mongoose'

const index = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.getAll(req.query as QueryString)
  const seo = buildSeoTags(SEO_TAGS_PER_PATH['/users'])
  const getQueryValue = (key: string, fallback: unknown) => {
    const value = req.query[key]
    return value ?? fallback
  }

  res
    .status(statuses.OK)
    .render('pages/users/index', { users, ...seo, getQueryValue })
})

const show = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  const userObject = await userService.getOne(id as unknown as ObjectId)
  if (!userObject)
    return res.status(statuses['Not Found']).redirect('/error/404')

  const seo = buildSeoTags(SEO_TAGS_PER_PATH['/users'])
  res.status(statuses.OK).render('pages/users/show', { userObject, ...seo })
})

const edit = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const userObject = await userService.getOne(id as unknown as ObjectId)
  if (!userObject)
    return res.status(statuses['Not Found']).redirect('/error/404')

  const seo = buildSeoTags(SEO_TAGS_PER_PATH['/users'])
  res.status(statuses.OK).render('pages/users/edit', { userObject, ...seo })
})

const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  await userService.updateOne(id as unknown as ObjectId, req.body)
  res.redirect(`/users/${id}`)
})

const destroy = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  await userService.deleteOne(id as unknown as ObjectId)
  res.redirect('/users')
})

const create = asyncHandler(async (req: Request, res: Response) => {
  const userObject = await userService.createOne(req.body)
  if (!userObject)
    return res.status(statuses['Not Found']).redirect('/error/404')
  res.redirect('/users')
})

const New = asyncHandler(async (_req: Request, res: Response) => {
  const seo = buildSeoTags(SEO_TAGS_PER_PATH['/users/new'])
  res.status(statuses.OK).render('pages/users/new', { ...seo })
})

export { index, show, edit, update, destroy, create, New }
