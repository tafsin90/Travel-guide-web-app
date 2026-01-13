import express from 'express'
import { db } from '../db.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.get('/profile', auth, async (req, res) => {
  try {
    const userId = req.user.id

    // Get visited places count
    const [countRows] = await db.query(
      'SELECT COUNT(*) as total FROM visited_places WHERE user_id = ?',
      [userId]
    )
    const totalVisited = countRows[0]?.total || 0

    // Get visited places with district name
    const [places] = await db.query(`
      SELECT t.id, t.spot_name, d.name as district_name, t.image
      FROM visited_places v
      JOIN tourist_spots t ON v.spot_id = t.id
      JOIN districts d ON t.district_id = d.id
      WHERE v.user_id = ?
      ORDER BY v.visited_at DESC
    `, [userId])

    // Get wishlist count
    const [wishCountRows] = await db.query(
      'SELECT COUNT(*) as total FROM wishlist WHERE user_id = ?',
      [userId]
    )
    const totalWishlist = wishCountRows[0]?.total || 0

    // Get wishlist places with district name
    const [wishlist] = await db.query(`
      SELECT t.id, t.spot_name, d.name as district_name, t.image
      FROM wishlist w
      JOIN tourist_spots t ON w.spot_id = t.id
      JOIN districts d ON t.district_id = d.id
      WHERE w.user_id = ?
      ORDER BY w.id DESC
    `, [userId])

    res.json({ totalVisited, places, totalWishlist, wishlist })
  } catch (err) {
    console.error('Profile error:', err)
    res.status(500).json({ message: 'Server error fetching profile' })
  }
})

router.post('/wishlist', auth, async (req, res) => {
  try {
    const { spotId } = req.body
    const userId = req.user.id

    if (!spotId) {
      return res.status(400).json({ message: 'Spot ID is required' })
    }

    // Check if already in wishlist
    const [existing] = await db.query(
      'SELECT id FROM wishlist WHERE user_id = ? AND spot_id = ?',
      [userId, spotId]
    )

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Already in wishlist' })
    }

    await db.query(
      'INSERT INTO wishlist (user_id, spot_id) VALUES (?, ?)',
      [userId, spotId]
    )
    res.json({ message: 'Added to wishlist' })
  } catch (err) {
    console.error('Wishlist error:', err)
    res.status(500).json({ message: 'Server error adding to wishlist' })
  }
})

router.post('/visited', auth, async (req, res) => {
  try {
    const { spotId } = req.body
    const userId = req.user.id

    if (!spotId) {
      return res.status(400).json({ message: 'Spot ID is required' })
    }

    // Check if already visited
    const [existing] = await db.query(
      'SELECT id FROM visited_places WHERE user_id = ? AND spot_id = ?',
      [userId, spotId]
    )

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Already marked as visited' })
    }

    await db.query(
      'INSERT INTO visited_places (user_id, spot_id) VALUES (?, ?)',
      [userId, spotId]
    )
    res.json({ message: 'Marked as visited' })
  } catch (err) {
    console.error('Visited places error:', err)
    res.status(500).json({ message: 'Server error marking as visited' })
  }
})

export default router
