async function loadCourses() {
  const courses = await apiRequest('/courses')
  const list = document.querySelector('#courseList')

  list.innerHTML = ''

  courses.forEach(course => {
    const li = document.createElement('li')
    li.innerText = course.title
    list.appendChild(li)
  })
}

async function createCourse(event) {
  event.preventDefault()

  const title = document.querySelector('#title').value
  const description = document.querySelector('#description').value

  await apiRequest('/courses', 'POST', { title, description })
  loadCourses()
}

loadCourses()
