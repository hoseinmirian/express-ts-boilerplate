export default {
  environments: process.env.NODE_ENV ?? 'development',
  port: process.env.PORT ?? 8000,
  databaseURI: process.env.DATABASE_URI as string,
  databaseName: `${process.env.DATABASE_NAME}${process.env.NODE_ENV === 'development' ? '-dev' : ''}`,
  databaseConnectionOptions: {
    autoCreate: process.env.NODE_ENV === 'development',
    autoIndex: process.env.NODE_ENV === 'development'
  },
  jwtSecret: process.env.JWT_SECRET ?? 'secret-something',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
  jwtCookieExpireIn: Number(process.env.JWT_COOKIE_EXPIRES_IN) || 1,
  jwtCookieExpireInUnit: process.env.JWT_COOKIE_EXPIRES_IN_UNIT ?? 'day',
  allowedOrigins: process.env.ALLOW_ORIGINS?.split(',') ?? []
}
