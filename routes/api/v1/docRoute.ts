import { Router } from 'express'

const router = Router()

router.route('/').get((req, res) => {
  res.send('dev route example')
})

export default router
