import { Router } from 'express'
import { isValidateID } from '../../middlewares/index.js'
import { authController } from '../../controllers/api/index.js'
import { cityController } from '../../controllers/web/index.js'

const router = Router()

const commonMiddlewares = [isValidateID, authController.isLoggedIn]

router.get('/', authController.isLoggedIn, cityController.index)
router.post('/', authController.isLoggedIn, cityController.create)
router.get('/new', authController.isLoggedIn, cityController.New)
router.get('/:id', ...commonMiddlewares, cityController.show)
router.patch('/:id', commonMiddlewares, cityController.update)
router.delete('/:id', commonMiddlewares, cityController.destroy)
router.get('/:id/edit', commonMiddlewares, cityController.edit)

export default router
