import axios from 'axios'
import { getEnvVariables } from '../helpers/getEnvVariables'

const { VITE_URL_API } = getEnvVariables()

const calendarApi = axios.create({
  baseURL: VITE_URL_API
})

// intercept each request and add token
calendarApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token')
  }
  return config
})

export default calendarApi