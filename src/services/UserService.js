import { AVION_API, AUTH_HEADERS } from './base'

export const createUser = async (data) => {
  const url = `${AVION_API}/auth`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(data)
  })
  
  return response
}

export const loginUser = async (data) => {
  const url = `${AVION_API}/auth/sign_in`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(data)
  })
  
  return response
}

export const listUsers = async () => {
  const url = `${AVION_API}/users`
  const response = await fetch(url, {
    method: 'GET',
    headers: AUTH_HEADERS
  })
  
  return response
}

