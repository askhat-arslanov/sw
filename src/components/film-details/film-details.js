import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import './film-details.scss'

import * as actions from 'actions/film-actions'
import ErrorBoundary from 'error-boundary'
import { withApi } from 'hoc'

const FilmDetails = ({ apiService, selectedFilmId, onSetFilmIdForReview }) => {
  const [isFetching, setIsFetching] = useState(false)
  const [filmDetails, setFilmDetails] = useState(null)

  useEffect(() => {
    if (selectedFilmId) {
      setIsFetching(true)

      apiService
        .getFilm(selectedFilmId)
        .then(response => {
          setFilmDetails(response)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setIsFetching(false)
        })
    }
  }, [selectedFilmId])

  return (
    <ErrorBoundary>
      <Card style={{ backgroundColor: '#272c34', color: '#eee' }}>
        {filmDetails ? (
          <>
            <CardContent style={{ color: '#eee' }}>
              <Typography color="textSecondary" gutterBottom></Typography>
              <Typography variant="h5" component="h2">
                {isFetching ? <Skeleton type="text" /> : filmDetails.title}
              </Typography>
              <Typography variant="body2" component="p" color="textSecondary">
                {isFetching ? <Skeleton type="rect" height={160} /> : filmDetails.opening}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="secondary"
                onClick={() => onSetFilmIdForReview(filmDetails.id)}
              >
                Write review
              </Button>
            </CardActions>
          </>
        ) : (
          <CardContent>
            <Typography variant="h2" component="h2" color="textSecondary">
              Choose episode
            </Typography>
          </CardContent>
        )}
      </Card>
    </ErrorBoundary>
  )
}

const enhance = connect(({ film }) => ({ selectedFilmId: film.selectedFilmId }), {
  onSetFilmIdForReview: actions.setFilmIdFormReview
})

export default enhance(withApi(FilmDetails))
