import City, { type CityType } from '../models/cityModel.js'
import { QueryBuilder, type QueryString } from '../utils/index.js'
import { type ObjectId } from 'mongoose'

const createOne = async (body: Pick<CityType, 'name'>): Promise<CityType> => {
  return City.create({
    ...body
  })
}

const getAll = async (requestQuery: QueryString): Promise<CityType[]> => {
  const cities = new QueryBuilder(City.find({}), requestQuery)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate()
  return cities.query.exec()
}

const getOne = async (
  id: ObjectId,
  populate?: string | undefined
): Promise<CityType | null> => {
  let query = City.findById(id)
  if (populate) {
    query = query.populate(populate.split(',').map((field) => field.trim()))
  }
  return query.exec()
}

const updateOne = async (
  id: ObjectId,
  body: Pick<CityType, 'name'>
): Promise<CityType | null> => {
  return City.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  }).exec()
}

const deleteOne = async (id: ObjectId): Promise<CityType | null> => {
  return City.findByIdAndDelete(id)
}

export default { createOne, getAll, getOne, updateOne, deleteOne }
