import express from 'express'
import { db } from '../db.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.get('/profile', auth, async (req, res) => {
  const userId = req.user.id

  const [[count]] = await db.query(
    'SELECT COUNT(*) total FROM visited_places WHERE user_id=?',
    [userId]
  )

  const [places] = await db.query(`
    SELECT t.spot_name, t.district
    FROM visited_places v
    JOIN tourist_spots t ON v.spot_id = t.id
    WHERE v.user_id = ?
  `, [userId])

  res.json({ totalVisited: count.total, places })
})

router.post('/wishlist', auth, async (req, res) => {
  const { spotId } = req.body
  await db.query(
    'INSERT INTO wishlist (user_id, spot_id) VALUES (?, ?)',
    [req.user.id, spotId]
  )
  res.json({ message: 'Added to wishlist' })
})

export default router
