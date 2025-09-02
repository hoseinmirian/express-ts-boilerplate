import mongoose from 'mongoose'

const { Schema, model } = mongoose

const citySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false
  }
)

const City = model('City', citySchema)

export type CityType = {
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export default City
