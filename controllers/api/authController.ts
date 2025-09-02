import config from '../../config/index.js'
import jwt, { type SignOptions, JwtPayload } from 'jsonwebtoken'
import { AppError, asyncHandler, statuses } from '../../utils/index.js'
import { type CookieOptions, NextFunction, Request, Response } from 'express'
import User, { type UserType } from '../../models/userModel.js'
import { type ObjectId } from 'mongoose'

const {
  environments,
  jwtSecret,
  jwtExpiresIn,
  jwtCookieExpireIn,
  jwtCookieExpireInUnit
} = config

const signToken = (id: ObjectId): string => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: jwtExpiresIn
  } as SignOptions)
}

const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, jwtSecret) as JwtPayload
}

type ExpireUnit = 'day' | 'hour' | 'minute' | 'second'

const createCookieToken = (
  userId: ObjectId,
  req: Request,
  duration: number = jwtCookieExpireIn,
  unit: ExpireUnit = jwtCookieExpireInUnit as ExpireUnit
): {
  token: string
  cookieOptions: CookieOptions
} => {
  const token = signToken(userId)

  const getMilliseconds = (value: number, unit: ExpireUnit): number => {
    switch (unit) {
      case 'day':
        return value * 24 * 60 * 60 * 1000
      case 'hour':
        return value * 60 * 60 * 1000
      case 'minute':
        return value * 60 * 1000
      case 'second':
        return value * 1000
      default:
        throw new Error(`Unsupported time unit: ${unit}`)
    }
  }

  const cookieOptions = {
    expires: new Date(Date.now() + getMilliseconds(duration, unit)),
    httpOnly: true,
    secure:
      environments === 'production'
        ? req.secure || req.headers['x-forwarded-proto'] === 'https'
        : false,
    sameSite: environments === 'production' ? 'strict' : 'lax'
  }

  return {
    token,
    cookieOptions: cookieOptions as CookieOptions
  }
}

const signUp = asyncHandler(async (req: Request, res: Response) => {
  const newUser: UserType = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  const { token, cookieOptions } = createCookieToken(newUser._id, req)

  res.cookie('jwt', token, cookieOptions)

  res.status(statuses.Created).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  })
})

const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    // 2) Check if user exists && password is correct
    const user: UserType = await User.findOne({ email }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(
        new AppError(statuses.Unauthorized, 'Incorrect email or password!')
      )
    }

    // 3) If everything ok, send token to client
    const { token, cookieOptions } = createCookieToken(user._id, req)

    res.cookie('jwt', token, cookieOptions)

    res.status(statuses.OK).json({
      status: 'success',
      token,
      data: {
        user
      }
    })
  }
)

const logout = (_: Request, res: Response) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: environments === 'production',
    sameSite: environments === 'production' ? 'strict' : 'lax'
  })
  res
    .status(statuses.OK)
    .json({ status: 'success', message: 'Logged out successfully' })
}

const protect = asyncHandler(
  async (
    req: Request & { user?: UserType },
    res: Response,
    next: NextFunction
  ) => {
    // 1) Getting token and check of it's there
    let token
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt
    }

    if (!token) {
      return next(
        new AppError(
          statuses.Unauthorized,
          'You are not logged in! Please log in to get access!'
        )
      )
    }

    // 2) Verification token
    const { id: userId, exp } = verifyToken(token)

    // 3) Check if token is expired
    if (exp && Date.now() >= exp * 1000) {
      return next(
        new AppError(statuses.Unauthorized, 'The user token is expired!')
      )
    }

    // 4) Check if user still exists
    const currentUser = await User.findById(userId)
    if (!currentUser) {
      return next(
        new AppError(
          statuses.Unauthorized,
          'The user belonging to this token does no longer exist!'
        )
      )
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    // req.user is used in the next middleware
    req.user = currentUser
    // locals.user is used for rendering views
    res.locals.user = currentUser
    next()
  }
)

// Only for rendered pages, no errors!
const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.accepts('html') && req.originalUrl.startsWith('/api')) {
    return next()
  }

  const token = req.cookies.jwt
  if (!token) {
    return next()
  }

  try {
    // 1) Verify token
    const { id: userId, exp } = verifyToken(token)

    // 2) Check if token is expired
    if (exp && Date.now() >= exp * 1000) {
      return next()
    }

    // 3) Check if user still exists
    const currentUser = await User.findById(userId)
    if (!currentUser) {
      return next()
    }

    // THERE IS A LOGGED IN USER
    res.locals.user = currentUser
    return next()
  } catch (error) {
    console.error('Error verifying token:', error)
    return next()
  }
}

type AuthGuardOptions = {
  redirectIfAuthenticatedTo?: string
  redirectIfUnauthenticatedTo?: string
}

function authGuard(options: AuthGuardOptions = {}) {
  return (_req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user

    if (user && options.redirectIfAuthenticatedTo) {
      // User is logged in, but shouldn't access this route (e.g., /login)
      return res.redirect(options.redirectIfAuthenticatedTo)
    }

    if (!user && options.redirectIfUnauthenticatedTo) {
      // User is not logged in but needs to be (e.g., /dashboard)
      return res.redirect(options.redirectIfUnauthenticatedTo)
    }

    next()
  }
}

export { signUp, login, logout, protect, isLoggedIn, authGuard }
