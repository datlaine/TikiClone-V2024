import axios from 'axios'

class Http {
      instance
      constructor() {
            this.instance = axios.create({
                  baseURL: 'http://127.0.0.1:4000',
                  timeout: 5000,
                  headers: {
                        'Content-Type': 'application/json',
                  },
            })
      }
}

const http = new Http().instance

export default http
