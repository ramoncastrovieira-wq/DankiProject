const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../database')

exports.register = (req, res) => {
  const { name, email, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, 8)

  db.run(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, 'teacher'],
    function (err) {
      if (err) return res.status(400).json({ error: err.message })
      res.json({ id: this.lastID })
    }
  )
}

exports.login = (req, res) => {
  const { email, password } = req.body

  db.get(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, user) => {
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' })

      const valid = bcrypt.compareSync(password, user.password)
      if (!valid) return res.status(401).json({ error: 'Senha inválida' })

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      res.json({ token })
    }
  )
}
