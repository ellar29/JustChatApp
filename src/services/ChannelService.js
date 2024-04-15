import { AVION_API, AUTH_HEADERS } from './base'

export const getChannels = async () => {
  const url = `${AVION_API}/channels`
  const response = await fetch(url, {
    method: 'GET',
    headers: AUTH_HEADERS,
  })
  
  return response
}


export const createChannelWithMembers = async (data) => {
  const url = `${AVION_API}/channels`
  const response = await fetch(url, {
    method: 'POST',
    headers: AUTH_HEADERS,
    body: JSON.stringify(data)
  })
  
  return response
}


export const getChannelDetailsViaChannelId = async (data) => {
  const url = `${AVION_API}/channels/${data.id}`
  const response = await fetch(url, {
    method: 'GET',
    headers: AUTH_HEADERS,
  })
  
  return response
}