import User, { type UserType } from '../models/userModel.js'
import { QueryBuilder, statuses, type QueryString } from '../utils/index.js'
import { type ObjectId } from 'mongoose'

const createOne = async (body: Omit<UserType, '_id'>): Promise<UserType> => {
  return User.create({
    ...body
  })
}

const getAll = async (requestQuery: QueryString): Promise<UserType[]> => {
  const users = new QueryBuilder(User.find({}), requestQuery)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate()
  return users.query.exec()
}

const getOne = async (
  id: ObjectId,
  populate?: string | undefined
): Promise<UserType | null> => {
  let query = User.findById(id)
  if (populate) {
    query = query.populate(populate.split(',').map((field) => field.trim()))
  }
  return query.exec()
}

const updateOne = async (
  id: ObjectId,
  body: Partial<UserType>
): Promise<UserType | null> => {
  return User.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  }).exec()
}

const deleteOne = async (id: ObjectId): Promise<UserType | null> => {
  return User.findByIdAndDelete(id).exec()
}

// Function to securely update the current user's password in local auth strategy (setting user pass is only allowed for local auth strategy)
const updateMyPassword = async (
  id: ObjectId,
  currentPassword: string,
  newPassword: string
): Promise<{ user: UserType | null; error?: number }> => {
  const user = await User.findById(id).select('+password')
  if (!user) return { user: null, error: statuses['Not Found'] }

  if (!user?.active) return { user: null, error: statuses['Not Found'] }

  const isMatch = await user.correctPassword(currentPassword, user.password)
  if (!isMatch) return { user: null, error: statuses['Unauthorized'] }

  user.password = newPassword
  await user.save()
  return { user }
}

export default {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
  updateMyPassword
}
