import React, { useContext, useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { Card, CardContent, List, ListItem, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

// Здесь обычно прописываются алиасы в webpack
// во избежание такого некрасивого пути
import * as actions from '../../store/actions/film-actions'

import './film-list.scss'
import ApiServiceContext from '../api-service-context'

const FilmList = ({ selectedFilmId, onSetSelectedFilmId }) => {
  const apiService = useContext(ApiServiceContext)

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
        <span>{title} <span style={{ color: '#7d7d7d' }}>{year}</span></span>
      </ListItem>
    ))

  return (
    <Card style={{ backgroundColor: '#272c34' }}>
      <CardContent>
        <List>{isFetching ? getSkeleton() : getFilmListTemplate()}</List>
      </CardContent>
    </Card>
  )
}

const enhance = connect(({ film }) => ({ selectedFilmId: film.selectedFilmId }), {
  onSetSelectedFilmId: actions.setSelectedFilmId
})

export default enhance(FilmList)
