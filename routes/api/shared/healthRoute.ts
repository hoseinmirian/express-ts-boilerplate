import { Router } from 'express'
import { statuses } from '../../../utils/index.js'

const router = Router()

router.route('/').get((_req, res) => {
  res.status(statuses.OK).json({
    status: 'success',
    data: {
      message: 'API is healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }
  })
})

export default router
