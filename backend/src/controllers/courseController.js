const db = require('../database')

exports.createCourse = (req, res) => {
  const { title, description } = req.body

  db.run(
    'INSERT INTO courses (title, description, owner_id) VALUES (?, ?, ?)',
    [title, description, req.user.id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message })
      res.json({ id: this.lastID })
    }
  )
}

exports.listCourses = (req, res) => {
  db.all(
    'SELECT * FROM courses WHERE owner_id = ?',
    [req.user.id],
    (err, rows) => {
      res.json(rows)
    }
  )
}
