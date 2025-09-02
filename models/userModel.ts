import mongoose, { type Document, ObjectId, Query } from 'mongoose'
const { Schema, model } = mongoose
import { hash, compare } from 'bcrypt'

// 1. Define the interface
export interface UserType extends Document {
  _id: ObjectId
  name: string
  email: string
  photo?: string
  password: string
  active?: boolean
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>
}

// 2. Define the schema
const userSchema = new Schema<UserType>(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
      lowercase: true
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true
    },
    photo: {
      type: String,
      default: 'default.jpg'
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false
    },
    active: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false
  }
)

// 3. Hash password before saving
userSchema.pre<UserType>('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await hash(this.password, 12)
  next()
})

// 4. Exclude inactive users from all find queries
userSchema.pre<Query<UserType[], UserType>>(/^find/, function (next) {
  this.where({ active: { $ne: false } })
  next()
})

// 5- Add a method to check if the password is correct
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await compare(candidatePassword, userPassword)
}

// 5. Create model
const User = model<UserType>('User', userSchema)

// 6. Export the model
export default User
