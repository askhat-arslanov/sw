import React from 'react'

import ErrorBoundary from 'error-boundary'

import './app.scss'
import FilmDetails from '../film-details'
import FilmList from '../film-list'
import Navbar from '../navbar'
import Review from '../review'

const App = () => {
  return (
    <ErrorBoundary>
      <Navbar />
      <div className="app">
        <FilmList />

        <FilmDetails />

        <Review />
      </div>
    </ErrorBoundary>
  )
}

export default App
