const express = require('express')
const router = express.Router()
const { createCourse, listCourses } = require('../controllers/courseController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/', authMiddleware, createCourse)
router.get('/', authMiddleware, listCourses)

module.exports = router
