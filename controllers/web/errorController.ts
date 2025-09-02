import { asyncHandler, buildSeoTags } from '../../utils/index.js'
import { SEO_TAGS_PER_ERROR_PATH } from '../../constants/index.js'

const renderError401Page = asyncHandler(async (_req, res) => {
  const seo = buildSeoTags(SEO_TAGS_PER_ERROR_PATH[401])
  res.render('pages/errors/error-401', { ...seo })
})

const renderError403Page = asyncHandler(async (_req, res) => {
  const seo = buildSeoTags(SEO_TAGS_PER_ERROR_PATH[403])
  res.render('pages/errors/error-403', { ...seo })
})

const renderError404Page = asyncHandler(async (_req, res) => {
  const seo = buildSeoTags(SEO_TAGS_PER_ERROR_PATH[404])
  res.render('pages/errors/error-404', { ...seo })
})

const renderError500Page = asyncHandler(async (_req, res) => {
  const seo = buildSeoTags(SEO_TAGS_PER_ERROR_PATH[500])
  res.render('pages/errors/error-500', { ...seo })
})

export {
  renderError401Page,
  renderError403Page,
  renderError404Page,
  renderError500Page
}
