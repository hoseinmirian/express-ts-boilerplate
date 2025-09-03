import { Router } from 'express'
import { errorController } from '../../controllers/web/index.js'

const router = Router()

router.get('/401', errorController.renderError401Page)
router.get('/403', errorController.renderError403Page)
router.get('/404', errorController.renderError404Page)
router.get('/500', errorController.renderError500Page)

export default router
