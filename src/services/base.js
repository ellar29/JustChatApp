export const AVION_API = 'http://206.189.91.54/api/v1'

export const AUTH_HEADERS = {
  "Content-type": "application/json; charset=UTF-8",
  "access-token": localStorage.getItem('token'),
  "client": localStorage.getItem('client'),
  "expiry": localStorage.getItem('expiry'),
  "uid": localStorage.getItem('uid')
}