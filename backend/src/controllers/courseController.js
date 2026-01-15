const db = require('../database')

exports.createCourse = async (req, res) => {
  const { title, description } = req.body

  await db.query(
    'INSERT INTO courses (title, description, owner_id) VALUES ($1,$2,$3)',
    [title, description, req.user.id]
  )

  res.json({ success: true })
}

exports.listCourses = async (req, res) => {
  const result = await db.query(
    'SELECT * FROM courses WHERE owner_id = $1',
    [req.user.id]
  )

  res.json(result.rows)
}
