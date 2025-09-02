process.on('uncaughtException', (err) => {
  console.error('🔥 Uncaught Exception:', err)
  process.exit(1)
})

import 'dotenv/config'
import app from './app.js'
import { connectToDB, disconnectFromDB } from './utils/index.js'
import config from './config/index.js'
import { type Server } from 'http'

const {
  port,
  databaseURI,
  databaseName,
  databaseConnectionOptions,
  environments
} = config

let server: Server | undefined = undefined

// 💥 Global unhandled rejection handler
process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Rejection:', err)

  if (!server) {
    console.log('No server to close. Exiting...')
    process.exit(1)
  }

  server.close(() => {
    console.log('🧼 Closing server and cleaning up...')
    ;(async () => {
      try {
        await disconnectFromDB()
        console.log('✅ DB disconnected')
      } catch (disconnectErr) {
        console.error('❌ Failed to disconnect DB:', disconnectErr)
      } finally {
        process.exit(1)
      }
    })()
  })
})

const main = async (): Promise<void> => {
  try {
    await connectToDB(databaseURI, databaseName, databaseConnectionOptions)

    server = app.listen(port, () => {
      console.log(`now you are in ${environments} listening to port ${port}`)
    })
  } catch (err) {
    console.error('❌ Error during startup:', err)
  }
}

main().then(() => {
  console.log('✅ App is running')
})
