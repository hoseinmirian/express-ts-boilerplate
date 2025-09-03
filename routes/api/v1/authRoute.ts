import { Router } from 'express'
import { authController } from '../../../controllers/api/index.js'
import { validateRequest } from '../../../middlewares/index.js'
import {
  createUserSchema,
  loginUserSchema
} from '../../../validationSchemas/index.js'

const router = Router()

router
  .route('/sign-up')
  .post(validateRequest(createUserSchema), authController.signUp)

router
  .route('/login')
  .post(validateRequest(loginUserSchema), authController.login)

router.route('/log-out').get(authController.logout)

export default router
