import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { Card, CardContent, List, ListItem } from '@material-ui/core'

import Spinner from '../spinner'
import ErrorBoundary from 'error-boundary'
import * as actions from 'actions/film-actions'
import { withApi } from 'hoc'

const FilmList = ({ apiService, selectedFilmId, onSetSelectedFilmId }) => {
  const [isFetching, setIsFetching] = useState(false)
  const [filmList, setFilmList] = useState([])

  useEffect(() => {
    setIsFetching(true)

    apiService
      .getFilmList()
      .then(list => {
        setFilmList(list)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsFetching(false)
      })
  }, [])

  const getFilmListTemplate = () =>
    filmList.map(({ id, title, year }) => (
      <ListItem
        style={{ color: '#eee' }}
        selected={id === selectedFilmId}
        button
        key={id}
        onClick={() => onSetSelectedFilmId(id)}
      >
        <span>
          {title} <span style={{ color: '#7d7d7d' }}>{year}</span>
        </span>
      </ListItem>
    ))

  return (
    <ErrorBoundary>
      <Card className="block" style={{ display: 'flex', justifyContent: isFetching ? 'center': 'unset' }}>
        <CardContent>
          <List>{isFetching ? <Spinner /> : getFilmListTemplate()}</List>
        </CardContent>
      </Card>
    </ErrorBoundary>
  )
}

const enhance = connect(({ film }) => ({ selectedFilmId: film.selectedFilmId }), {
  onSetSelectedFilmId: actions.setSelectedFilmId
})

export default enhance(withApi(FilmList))
