import { Router } from 'express'
import { validateRequest } from '../../../middlewares/index.js'
import { cityController } from '../../../controllers/api/index.js'
import {
  createCitySchema,
  deleteCitySchema,
  getCitySchema,
  updateCitySchema
} from '../../../validationSchemas/index.js'

const router = Router()

router
  .route('/')
  .get(cityController.getCities)
  .post(validateRequest(createCitySchema), cityController.createCity)

router
  .route('/:id')
  .get(validateRequest(getCitySchema), cityController.getCity)
  .patch(validateRequest(updateCitySchema), cityController.updateCity)
  .delete(validateRequest(deleteCitySchema), cityController.deleteCity)

export default router
