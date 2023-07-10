import axios from 'axios'
import { apiLink } from './api'

class Http {
  instance

  constructor() {
    this.instance = axios.create({
      baseURL: apiLink,
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export const http = new Http().instance
