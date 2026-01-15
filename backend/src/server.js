require('dotenv').config()
const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const courseRoutes = require('./routes/courseRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/courses', courseRoutes)

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})
