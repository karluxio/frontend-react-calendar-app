import axios from 'axios'
import { getEnvVariables } from '../helpers/getEnvVariables'

const { VITE_URL_API } = getEnvVariables()

const calendarApi = axios.create({
  baseURL: VITE_URL_API
})

//! TODO: configure interceptors

export default calendarApi