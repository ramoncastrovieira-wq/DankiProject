async function login(event) {
  event.preventDefault()

  const email = document.querySelector('#email').value
  const password = document.querySelector('#password').value

  const result = await apiRequest('/auth/login', 'POST', {
    email,
    password
  })

  if (result.token) {
    localStorage.setItem('token', result.token)
    window.location.href = 'dashboard.html'
  } else {
    alert(result.error)
  }
}
