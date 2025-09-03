import { Router } from 'express'
import { isValidateID } from '../../middlewares/index.js'
import { authController } from '../../controllers/api/index.js'
import { userController } from '../../controllers/web/index.js'

const router = Router()

const authMiddleWares = [
  authController.isLoggedIn,
  authController.authGuard({ redirectIfUnauthenticatedTo: '/auth/login' })
]

router.get('/', ...authMiddleWares, userController.index)
router.post('/', ...authMiddleWares, userController.create)
router.get('/new', ...authMiddleWares, userController.New)
router.get('/:id', isValidateID, ...authMiddleWares, userController.show)
router.patch('/:id', isValidateID, ...authMiddleWares, userController.update)
router.delete('/:id', isValidateID, ...authMiddleWares, userController.destroy)
router.get('/:id/edit', isValidateID, ...authMiddleWares, userController.edit)

export default router
