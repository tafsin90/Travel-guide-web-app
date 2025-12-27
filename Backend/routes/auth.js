import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../db.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  const hash = await bcrypt.hash(password, 10)

  await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hash]
  )

  res.json({ message: 'Registered' })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const [[user]] = await db.query(
    'SELECT * FROM users WHERE email=?',
    [email]
  )

  if (!user) return res.status(404).json({ message: 'User not found' })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ message: 'Wrong password' })

  const token = jwt.sign(
    { id: user.id, email: user.email },
    'SECRET_KEY',
    { expiresIn: '1d' }
  )

  res.json({ token })
})

export default router
