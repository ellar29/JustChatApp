import { AVION_API, AUTH_HEADERS } from './base'

export const sendMessage = async (data) => {
  const url = `${AVION_API}/messages`
  const response = await fetch(url, {
    method: 'POST',
    headers: AUTH_HEADERS,
    body: JSON.stringify(data)
  })
  
  return response
}

export const retrieveMessage = async (data) => {
  const url = `${AVION_API}/messages?receiver_id=${data.receiver_id}&receiver_class=${data.receiver_class}`
  const response = await fetch(url, {
    method: 'GET',
    headers: AUTH_HEADERS,
  })
  
  return response
}