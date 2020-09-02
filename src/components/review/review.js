import React, { useState } from 'react'
import { connect } from 'react-redux'

import { TextField, Card, CardContent, Button, InputAdornment } from '@material-ui/core'
import { AccountCircle, EmailRounded } from '@material-ui/icons'
import './review.scss'

import ErrorBoundary from 'error-boundary'
import { withApi } from 'hoc'

const Review = ({ apiService, filmIdForReview }) => {
  const [isSaving, setIsSaving] = useState(false)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [reviewText, setReviewText] = useState('')

  const getIsButtonDisabled = () => {
    return isSaving || !username || !email || !reviewText
  }

  const saveReviewHandler = () => {
    setIsSaving(true)

    apiService
      .saveReview({ email, username, reviewText })
      .then(response => {
        setEmail('')
        setUsername('')
        setReviewText('')
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  return filmIdForReview ? (
    <ErrorBoundary>
      <Card className="review">
        <CardContent>
          <form className="review-form" noValidate autoComplete="off">
            <div>
              <TextField
                required
                disabled={isSaving}
                id="standard-basic"
                label="Name"
                value={username}
                name="username"
                onChange={e => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                required
                disabled={isSaving}
                id="standard-basic"
                label="Email"
                value={email}
                name="email"
                onChange={e => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRounded />
                    </InputAdornment>
                  )
                }}
              />
            </div>

            <TextField
              required
              disabled={isSaving}
              id="outlined-multiline-static"
              label="Name"
              value={reviewText}
              name="review-text"
              multiline
              rows={4}
              onChange={e => setReviewText(e.target.value)}
            />
          </form>

          <Button disabled={getIsButtonDisabled()} onClick={saveReviewHandler}>
            Save
          </Button>
        </CardContent>
      </Card>
    </ErrorBoundary>
  ) : (
    ''
  )
}

const enhance = connect(({ film }) => ({ filmIdForReview: film.filmIdForReview }))

export default enhance(withApi(Review))
