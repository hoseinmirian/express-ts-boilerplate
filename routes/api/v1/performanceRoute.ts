// Add this to your Express app (e.g., in a route or log)
import { Router } from 'express'
import { statuses } from '../../../utils/index.js'

const router = Router()

router.route('/').get((_req, res) => {
  const memory = process.memoryUsage()
  res.status(statuses.OK).json({
    status: 'success',
    data: {
      rss: `${(memory.rss / 1024 / 1024).toFixed(2)} MB`,
      heapTotal: `${(memory.heapTotal / 1024 / 1024).toFixed(2)} MB`,
      heapUsed: `${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB`,
      external: `${(memory.external / 1024 / 1024).toFixed(2)} MB`
    }
  })
})

export default router

// Metric for normal expected behavior
// Good Range
// heapUsed < 100 MB for small/medium apps
// heapTotal < 150 MB
// rss < 250–300 MB
// external < 50 MB unless you’re doing a lot of file/buffer work
