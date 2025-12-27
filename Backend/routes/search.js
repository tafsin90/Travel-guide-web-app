import express from 'express'
import { db } from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const q = `%${req.query.q}%`

  const [rows] = await db.query(
    'SELECT id, spot_name, district FROM tourist_spots WHERE district LIKE ?',
    [q]
  )

  res.json(rows)
})

export default router
