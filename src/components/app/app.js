import React from 'react'

import './app.scss'
import FilmDetails from '../film-details'
import FilmList from '../film-list'
import Navbar from '../navbar'
import Review from '../review'

const App = () => {
  return (
    <>
      <Navbar />
      <div className="app">
        <FilmList />
        <FilmDetails />

        <Review />
      </div>
    </>
  )
}

export default App
