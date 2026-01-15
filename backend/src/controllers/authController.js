const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../database')

exports.register = async (req, res) => {
  const { name, email, password } = req.body
  const hashed = bcrypt.hashSync(password, 8)

  try {
    const result = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id',
      [name, email, hashed, 'teacher']
    )
    res.json({ id: result.rows[0].id })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  const result = await db.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  )

  if (!result.rows.length)
    return res.status(404).json({ error: 'Usuário não encontrado' })

  const user = result.rows[0]

  if (!bcrypt.compareSync(password, user.password))
    return res.status(401).json({ error: 'Senha inválida' })

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  res.json({ token })
}
