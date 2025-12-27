import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import searchRoutes from './routes/search.js'
import { db } from './db.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/districts', express.static('public/districts'))


app.get('/api/districts', async (req, res) => {
  try {
    const sql = 'SELECT id, name, image_url FROM districts'
    const [rows] = await db.query(sql)
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})



app.get('/api/districts/:id/spots', async (req, res) => {
  const districtId = req.params.id

  try {
    const sql = `
      SELECT id, spot_name, image
      FROM tourist_spots
      WHERE district_id = ?
    `
    const [rows] = await db.query(sql, [districtId])
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/search', searchRoutes)

app.listen(5000, () => {
  console.log('Server running on port 5000')
})
