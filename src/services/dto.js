export default class DTO {
  parseGetFilmListResponse(data = {}) {
    const { results = [] } = data

    const filmList = []

    results.forEach((film = {}) => {
      filmList.push(this.parseFilm(film))
    })

    return filmList
  }

  parseGetFilmResponse(film = {}) {
    return this.parseFilm(film)
  }

  parseFilm(film = {}) {
    return {
      id: film.episode_id,
      title: film.title || '',
      opening: film.opening_crawl || '',
      year: new Date(film.release_date).getFullYear() || ''
    }
  }
}
