import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'

import ErrorBoundary from 'error-boundary'

import './app.scss'
import FilmDetails from '../film-details'
import FilmList from '../film-list'
import Spinner from '../spinner'
import Navbar from '../navbar'

const Review = lazy(() => import('../review'))

const App = ({ filmIdForReview }) => {
  return (
    <ErrorBoundary>
      <Navbar />
      <div className="app">
        <FilmList />

        <FilmDetails />

        {!!filmIdForReview && (
          <Suspense fallback={<Spinner />}>
            <Review />
          </Suspense>
        )}
      </div>
    </ErrorBoundary>
  )
}

const enhance = connect(({ film }) => ({ filmIdForReview: film.filmIdForReview }))

export default enhance(App)
