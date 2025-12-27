import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  const login = async () => {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email, password
    })
    localStorage.setItem('token', res.data.token)
    nav('/home')
  }

  return (
    <div>
      <input onChange={e => setEmail(e.target.value)} />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  )
}
