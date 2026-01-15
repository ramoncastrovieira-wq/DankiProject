const API_URL = 'http://localhost:3000/api'

function getToken() {
  return localStorage.getItem('token')
}

async function apiRequest(endpoint, method = 'GET', data) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    }
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(`${API_URL}${endpoint}`, options)
  return response.json()
}
