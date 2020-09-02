import * as t from '../types/film-types'

export const setSelectedFilmId = selectedFilmId => ({
  type: t.SET_SELECTED_FILM_ID,
  payload: { selectedFilmId }
})

export const setFilmIdFormReview = filmIdForReview => ({
  type: t.SET_FILM_FOR_REVIEW,
  payload: { filmIdForReview }
})
