import { Router } from 'express'
import { authController as webAuthController } from '../../controllers/web/index.js'
import { authController } from '../../controllers/api/index.js'

const router = Router()

const authMiddleWares = [
  authController.isLoggedIn,
  authController.authGuard({ redirectIfAuthenticatedTo: '/dashboard' })
]

router.get('/sign-up', ...authMiddleWares, webAuthController.renderSignUpPage)

router.get('/login', ...authMiddleWares, webAuthController.renderLoginPage)

export default router
