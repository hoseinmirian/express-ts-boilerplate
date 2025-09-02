import { cityService } from '../../services/index.js'
import {
  statuses,
  asyncHandler,
  AppError,
  QueryString
} from '../../utils/index.js'
import { type Request, Response, NextFunction } from 'express'
import { type ObjectId } from 'mongoose'

const createCity = asyncHandler(async (req: Request, res: Response) => {
  const city = await cityService.createOne(req.body)
  res.status(statuses.Created).json({
    status: 'success',
    data: {
      city
    }
  })
})

const getCities = asyncHandler(async (req: Request, res: Response) => {
  const filteredCities = await cityService.getAll(req.query as QueryString)
  res.status(statuses.OK).json({
    status: 'success',
    data: {
      cities: filteredCities
    }
  })
})

const getCity = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { populate = undefined } = req.query
    const city = await cityService.getOne(
      id as unknown as ObjectId,
      populate as string | undefined
    )
    if (!city) {
      return next(
        new AppError(statuses['Not Found'], 'No document found with that ID')
      )
    }
    res.status(statuses.OK).json({
      status: 'success',
      data: {
        city
      }
    })
  }
)

const updateCity = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const updatedCity = await cityService.updateOne(
      id as unknown as ObjectId,
      req.body
    )
    if (!updatedCity) {
      return next(
        new AppError(statuses['Not Found'], 'No document found with that ID')
      )
    }
    res.status(statuses.OK).json({
      status: 'success',
      data: {
        city: updatedCity
      }
    })
  }
)

const deleteCity = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const deletedCity = await cityService.deleteOne(id as unknown as ObjectId)
    if (!deletedCity) {
      return next(
        new AppError(statuses['Not Found'], 'No document found with that ID')
      )
    }
    res.status(statuses['No Content']).json({
      status: 'success',
      data: null
    })
  }
)

export { createCity, getCity, getCities, updateCity, deleteCity }
