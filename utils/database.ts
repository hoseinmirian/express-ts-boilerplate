import mongoose from 'mongoose'
import type { Db } from 'mongodb'

const connectToDB = async (
  databaseURI: string,
  databaseName: string,
  options: Record<string, boolean> = { autoCreate: false, autoIndex: false }
) => {
  try {
    await mongoose.connect(databaseURI, {
      dbName: databaseName,
      bufferCommands: false,
      autoCreate: options.autoCreate,
      autoIndex: options.autoIndex
    })
    // in production we don't want to create indexes automatically as we need control over
    console.log(`database name : ${databaseName} DB connection successful!`)

    // After connecting, log the MongoDB server version
    await getMongoDBVersion()
  } catch (error) {
    console.error('DB connection failed', error)
  }
}

const disconnectFromDB = async () => {
  try {
    await mongoose.disconnect()
    console.log('DB connection closed successfully!')
  } catch (error) {
    console.error('Failed to close DB connection', error)
  }
}

const getMongoDBVersion = async () => {
  try {
    // Ensure the connection is ready and db is available
    const db = mongoose.connection.db as Db
    const admin = db.admin()
    const info = await admin.serverStatus()
    console.log(`MongoDB server version: ${info.version}`)
    return info.version
  } catch (error) {
    console.error('Failed to get MongoDB server version:', error)
    return null
  }
}

export { connectToDB, disconnectFromDB }
