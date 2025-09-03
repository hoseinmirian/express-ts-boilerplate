import { Router } from 'express'
import {
  authController,
  userController
} from '../../../controllers/api/index.js'

const router = Router()

// Protect all routes after this middleware
router.use(authController.protect)

/// begin - only for admin
router.route('/').get(userController.getUsers).post(userController.createUser)

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)
/// end - only for admin

// only for logged in normal user
router.get('/currentUser', userController.getCurrentUser)

router.patch('/updateMe', userController.getMe, userController.updateUser)

router.delete('/deleteMe', userController.deleteMe)

export default router
