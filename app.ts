import express, { type NextFunction, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import methodOverride from 'method-override'
import compression from 'compression'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'
import config from './config/index.js'
import routes from './routes/api/index.js'
import webRoutes from './routes/web/index.js'
import {
    AppError,
    type CustomRequest,
    globalErrorHandler,
    statuses
} from './utils/index.js'
import { xss } from 'express-xss-sanitizer'
import path from 'node:path'
import expressLayouts from 'express-ejs-layouts'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { authController } from './controllers/api/index.js'

// ts hack for __dirname
// instead of __dirname we have to use it the below way
// const __dirname = process.cwd()
const currentDir = process.cwd() // ✅ Safe name

// get required configurations
const { environments, allowedOrigins } = config

// setup express app
const app = express()

// hide express.js from the HTTP headers
// if hosted on heroku, set the env variable to app.enable('trust proxy')
app.disable('trust proxy')

// hide express.js from the HTTP headers
app.disable('x-powered-by')

// --- View engine setup ---
app.set('view engine', 'ejs')
app.set('views', path.join(currentDir, 'views'))
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)
app.use(expressLayouts)
app.set('layout', 'layout')

// set security HTTP headers
app.use(
    helmet({
        contentSecurityPolicy:
            environments === 'production'
                ? {
                    useDefaults: true,
                    directives: {
                        defaultSrc: ["'self'"],
                        scriptSrc: [
                            "'self'",
                            "'unsafe-eval'", // 👈 Required for Alpine.js via CDN
                            "'unsafe-inline'", // ✅ Allow inline Alpine/Vue hydration + data bindings
                            'https://cdnjs.cloudflare.com',
                            'https://unpkg.com'
                        ],
                        styleSrc: [
                            "'self'",
                            "'unsafe-inline'", // ✅ Allow inline Alpine/Vue hydration + data bindings
                            'https://fonts.googleapis.com'
                        ],
                        imgSrc: ["'self'", 'data:'],
                        connectSrc: ["'self'"],
                        fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com'],
                        objectSrc: ["'none'"],
                        frameAncestors: ["'self'"],
                        baseUri: ["'self'"],
                        formAction: ["'self'"]
                    }
                }
                : false, // Disable CSP in development for easier debugging
        referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
        hsts:
            environments === 'production'
                ? { maxAge: 31536000, includeSubDomains: true, preload: true }
                : false
    })
)

// sanitize request data
app.use(mongoSanitize())

// stop xss attacks
app.use(xss())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true, limit: '1mb' }))

// parse cookie
app.use(cookieParser())

// gzip compression
app.use(compression())

// enable cors with allowed hosts
if (environments === 'development') app.use(cors())
if (environments === 'production') {
    app.use(
        '/api',
        cors({
            origin: (origin, callback) => {
                // No origin — likely Postman, curl, or 'same-origin' request
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true)
                } else {
                    callback(
                        new AppError(
                            statuses.Forbidden,
                            'CORS policy: Not allowed by Access-Control-Allow-Origin'
                        )
                    )
                }
            }
        })
    )
}

// Development logging
if (environments === 'development') app.use(morgan('dev'))

// Limit requests from the same API only for production
if (environments === 'production') {
    const limiter = rateLimit({
        limit: 100,
        windowMs: 60 * 60 * 1000,
        message: 'Too many requests from this IP, please try again in an hour!'
    })
    app.use('/api', limiter)
}

// method override
app.use(methodOverride('_method'))

// web routes
app.use('/', webRoutes)

// api versioned routes
app.use('/api', routes)

app.all(
    '*',
    authController.isLoggedIn,
    (req: CustomRequest, _res: Response, next: NextFunction) => {
        if (
            req.accepts('html') &&
            !req.path.startsWith('/api') &&
            !req.originalUrl.startsWith('/api')
        ) {
            req.isWebRequest = true
        }

        next(new AppError(404, `Can't find ${req.originalUrl} on this server!`))
    }
)

app.use(globalErrorHandler)

export default app
