import express, { Router } from 'express'
import path from 'node:path'
import { assignDefaultMiddleWares, noCache } from '../../middlewares/index.js'
import { authController } from '../../controllers/api/index.js'
import { viewsController } from '../../controllers/web/index.js'
import authRoute from './authRoute.js'
import cityRoute from './cityRoute.js'
import errorRoute from './errorRoute.js'
import userRoute from './userRoute.js'

const router = Router()
const currentDir = process.cwd()

// applied no-cache-middleware to all routes (could be customize for only specific routes for better performance)
router.use(assignDefaultMiddleWares).use(noCache)

// Serve static files only for server routes (e.g., global CSS, JS)
router.use('/', express.static(path.join(currentDir, 'public')))

// --- server views

// ---begin -  public routes
router.get('/', authController.isLoggedIn, viewsController.renderHomePage)

router.get(
  '/hydrate-vue',
  authController.isLoggedIn,
  viewsController.renderHydrateVuePage
)

router.use('/cities', cityRoute)
// ---end -  public routes

// ---begin -  auth routes
router.use('/auth', authRoute)
// ---end -  auth routes

// ---begin -  protected routes
router.use('/users', userRoute)

router.get(
  '/dashboard',
  authController.isLoggedIn,
  authController.authGuard({ redirectIfUnauthenticatedTo: '/auth/login' }),
  viewsController.renderDashboardPage
)

router.get(
  '/dashboard-iframe',
  authController.isLoggedIn,
  authController.authGuard({ redirectIfUnauthenticatedTo: '/auth/login' }),
  viewsController.renderDashboardWithIframePage
)

router.get(
  /^\/dashboard-vue-in-ejs(\/.*)?$/,
  authController.isLoggedIn,
  authController.authGuard({ redirectIfUnauthenticatedTo: '/auth/login' }),
  viewsController.renderDashboardWithVueInEjsPage
)
// ---end -  protected routes

// only for client-side assets to be rendered individually without ejs
router.use('/', express.static(path.join(currentDir, 'public', 'client')))

// Handle client-side routing inside the Vue app
router.get('/app/*', viewsController.renderFullClientVuePage)

// Error routes
router.use('/error', errorRoute)

export default router
