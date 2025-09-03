import { Router } from 'express'
import config from '../../config/index.js'
import authRoute from './v1/authRoute.js'
import cityRoute from './v1/cityRoute.js'
import performanceRoute from './v1/performanceRoute.js'
import userRoute from './v1/userRoute.js'
import docRoute from './v1/docRoute.js' // as an example for routes only available in development mode
import healthRoute from './shared/healthRoute.js' // health check route
import { type Route } from './types.js'

const { environments } = config
const router = Router()

// shared for all versions will be served at /api/health as it has no prefixed v1 or v2
const sharedRoutes = [
  {
    path: '/health',
    route: healthRoute
  }
]

const defaultRoutesV1: Route[] = [
  {
    path: '/v1/auth',
    route: authRoute
  },
  {
    path: '/v1/cities',
    route: cityRoute
  },
  {
    path: '/v1/users',
    route: userRoute
  },
  {
    path: '/v1/performance',
    route: performanceRoute
  }
]

const defaultRoutesV2: Route[] = [
  {
    path: '/v2/cities',
    route: cityRoute
  }
]

const allRoutes = [...defaultRoutesV1, ...defaultRoutesV2, ...sharedRoutes]

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docRoute
  }
]

allRoutes.forEach((routeItem) => {
  router.use(routeItem.path, routeItem.route)
})

/* istanbul ignore next */
if (environments === 'development') {
  devRoutes.forEach((routeItem) => {
    router.use(routeItem.path, routeItem.route)
  })
}

export default router
