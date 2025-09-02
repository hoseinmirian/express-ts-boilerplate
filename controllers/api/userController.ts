import { userService } from '../../services/index.js'
import {
  statuses,
  asyncHandler,
  AppError,
  QueryString,
  type CustomRequest
} from '../../utils/index.js'
import { type Request, Response, NextFunction } from 'express'
import { type ObjectId } from 'mongoose'

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.createOne(req.body)
  res.status(statuses.Created).json({
    status: 'success',
    data: {
      user
    }
  })
})

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const filteredCities = await userService.getAll(req.query as QueryString)
  res.status(statuses.OK).json({
    status: 'success',
    data: {
      users: filteredCities
    }
  })
})

const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { populate = undefined } = req.query
    const user = await userService.getOne(
      id as unknown as ObjectId,
      populate as string | undefined
    )
    if (!user) {
      return next(
        new AppError(statuses['Not Found'], 'No document found with that ID')
      )
    }
    res.status(statuses.OK).json({
      status: 'success',
      data: {
        user
      }
    })
  }
)

const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const updatedUser = await userService.updateOne(
      id as unknown as ObjectId,
      req.body
    )
    if (!updatedUser) {
      return next(
        new AppError(statuses['Not Found'], 'No document found with that ID')
      )
    }
    res.status(statuses.OK).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    })
  }
)

const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const deletedCity = await userService.deleteOne(id as unknown as ObjectId)
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

const getMe = (req: CustomRequest, _res: Response, next: NextFunction) => {
  req.params.id = req.user!.id as unknown as string
  next()
}

const getCurrentUser = (req: CustomRequest, res: Response) => {
  res.status(statuses['OK']).json({
    status: 'success',
    data: req.user
  })
}

const deleteMe = asyncHandler(async (req: CustomRequest, res: Response) => {
  const currentUserID = req.user!.id
  await userService.updateOne(currentUserID, { active: false })
  res.status(statuses['No Content']).json({
    status: 'success',
    data: 'Your account has been deleted!'
  })
})

export {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getMe,
  getCurrentUser,
  deleteMe
}
