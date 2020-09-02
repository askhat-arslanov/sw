import { getDateNow } from 'helpers'

export default class ApiService {
  baseUrl = process.env.BASE_URL

  constructor(dto) {
    this.dto = dto
  }

  async makeGetRequest(path) {
    const url = `${this.baseUrl}/${path}/`

    try {
      const response = await fetch(url)
      return await response.json()
    } catch (err) {
      console.error(err.message)
    }
  }

  async getFilmList() {
    const path = `films`
    const response = await this.makeGetRequest(path)
    return this.dto.parseGetFilmListResponse(response)
  }

  async getFilm(id) {
    const path = `films/${id}`
    const response = await this.makeGetRequest(path)
    return this.dto.parseGetFilmResponse(response)
  }

  async saveReview({ username, email, reviewText }) {
    const time = getDateNow()

    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ username, email, reviewText, time })
      }, 1000)
    })
  }
}
