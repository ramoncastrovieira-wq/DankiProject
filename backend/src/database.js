const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'danki_user',
  password: '1234',
  database: 'danki_project',
  port: 5432
})

module.exports = {
  query: (text, params) => pool.query(text, params)
}
