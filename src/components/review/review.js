import React, { useContext, useEffect, useState } from 'react'
import { connect } from 'react-redux'

import {
  TextField,
  Card,
  CardContent,
  Button,
  Typography,
  InputProps,
  InputAdornment
} from '@material-ui/core'
import { AccountCircle, EmailRounded } from '@material-ui/icons'

import './review.scss'
import ApiServiceContext from '../api-service-context'

const Review = ({ filmIdForReview }) => {
  const apiService = useContext(ApiServiceContext)

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
      .then(() => {
        console.log('yo')
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  return filmIdForReview ? (
    <Card className="review">
      <CardContent>
        <form className="review-form" noValidate autoComplete="off">
          <div>
            <TextField
              required
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
            id="outlined-multiline-static"
            label="Name"
            value={reviewText}
            name="review-text"
            multiline
            rows={4}
            onChange={e => setReviewText(e.target.value)}
          />
        </form>

        <Button disabled={getIsButtonDisabled()} onCLick={saveReviewHandler}>
          Save
        </Button>
      </CardContent>
    </Card>
  ) : (
    ''
  )
}

const enhance = connect(({ film }) => ({ filmIdForReview: film.filmIdForReview }))

export default enhance(Review)
