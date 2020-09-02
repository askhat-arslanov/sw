import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { Card, CardContent, List, ListItem, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import './film-list.scss'

import * as actions from 'actions/film-actions'
import ErrorBoundary from 'error-boundary'
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

  const getSkeleton = () =>
    Array.from({ length: 6 }).map((_, idx) => (
      <ListItem key={idx}>
        <Skeleton key={idx} variant="text" />
      </ListItem>
    ))

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
      <Card style={{ backgroundColor: '#272c34' }}>
        <CardContent>
          <List>{isFetching ? getSkeleton() : getFilmListTemplate()}</List>
        </CardContent>
      </Card>
    </ErrorBoundary>
  )
}

const enhance = connect(({ film }) => ({ selectedFilmId: film.selectedFilmId }), {
  onSetSelectedFilmId: actions.setSelectedFilmId
})

export default enhance(withApi(FilmList))
