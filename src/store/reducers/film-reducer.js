import * as t from '../types/film-types'

export const initialState = {
  filmIdForReview: '',
  selectedFilmId: ''
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case t.SET_SELECTED_FILM_ID:
      const { selectedFilmId } = payload
      return {
        ...state,
        selectedFilmId
      }

    case t.SET_FILM_FOR_REVIEW:
      const { filmIdForReview } = payload
      return {
        ...state,
        filmIdForReview
      }

    default:
      return state
  }
}
