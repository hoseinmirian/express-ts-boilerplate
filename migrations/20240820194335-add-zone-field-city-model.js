// eslint-disable-next-line @typescript-eslint/no-unused-vars
const up = async (db, _client) => {
  // TODO write your migration here.
  // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
  // Example:
  await db.collection('cities').updateMany({}, { $set: { zone: 'zone value' } })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const down = async (db, _client) => {
  // TODO write the statements to rollback your migration (if possible)
  // Example:
  await db.collection('cities').updateMany({}, { $unset: { zone: 1 } })
}

export { up, down }
