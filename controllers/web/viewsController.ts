import { SEO_TAGS_PER_PATH } from '../../constants/index.js'
import { asyncHandler, buildSeoTags, statuses } from '../../utils/index.js'
import { type Request, Response } from 'express'
import path from 'node:path'
import fs from 'node:fs'

const resolve = path.resolve
const currentDir = process.cwd()

// ---begin -  public controller routes
const renderHomePage = asyncHandler(async (_req_: Request, res: Response) => {
  const seo = buildSeoTags(SEO_TAGS_PER_PATH['/'])
  res.status(statuses.OK).render('pages/landing', { ...seo })
})

const renderHydrateVuePage = asyncHandler(async (_req, res) => {
  const seo = buildSeoTags(SEO_TAGS_PER_PATH['/hydrate-vue'])
  const payload = {
    date: '2025-05-07',
    caption: 'initial caption from server'
  }
  // initialServerStates is a prop that will be passed to any Vue app for hydration
  res.render('pages/hydrate-vue', {
    ...seo,
    initialServerStates: { ...payload }
  })
})

// ---begin -  auth controller routes

// ---begin -  protected controller routes
const renderDashboardPage = asyncHandler(async (_req, res) => {
  const seo = buildSeoTags(SEO_TAGS_PER_PATH['/dashboard'])
  res.render('pages/dashboard', { ...seo })
})

const renderDashboardWithIframePage = asyncHandler(async (_req, res) => {
  const seo = buildSeoTags(SEO_TAGS_PER_PATH['/dashboard-iframe'])
  res.render('pages/dashboard-iframe', { ...seo })
})

const renderDashboardWithVueInEjsPage = asyncHandler(async (_req, res) => {
  const manifestPath = path.join(
    currentDir,
    'public',
    'client',
    '.vite',
    'manifest.json'
  )
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))

  const entry = manifest['index.html']

  const seo = buildSeoTags(SEO_TAGS_PER_PATH['/dashboard-vue-in-ejs'])
  res.render('pages/dashboard-vue-in-ejs', {
    ...seo,
    jsFile: `/${entry.file}`,
    cssFile: `/${entry.css[0]}`,
    title: 'Dashboard With Vue In Ejs'
  })
})

// begin - full client-side routes
const renderFullClientVuePage = asyncHandler(
  async (_req: Request, res: Response) => {
    const indexPath = resolve('public/client/' + 'index.html')
    res.sendFile(indexPath)
  }
)
// // Handle Vue client-side routing by sending the index.html file
// app.get('^/$|/index(.html)?', (_: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, 'public/dist', 'index.html'))
// })

// --begin -  errors controller routes

export {
  renderHomePage,
  renderHydrateVuePage,
  renderDashboardPage,
  renderDashboardWithIframePage,
  renderDashboardWithVueInEjsPage,
  renderFullClientVuePage
}
