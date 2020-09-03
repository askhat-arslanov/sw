import React, { useState } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import { TextField, Card, CardContent, Button, InputAdornment } from '@material-ui/core'
import { AccountCircle, EmailRounded } from '@material-ui/icons'

import './review.scss'

import Popup from '../popup'
import ErrorBoundary from 'error-boundary'
import { validateEmail } from 'helpers'
import { withApi } from 'hoc'

const CssTextField = withStyles({
  root: {
    '& label': {
      color: '#eee'
    },
    '& label.Mui-focused': {
      color: '#ebf013'
    },
    '& input': {
      color: '#eee',
    },
    '& textarea': {
      color: '#eee',
    }
  }
})(TextField)

const Review = ({ apiService, filmIdForReview }) => {
  const [isSaving, setIsSaving] = useState(false)
  const [showingConfirm, setShowingConfirm] = useState(false)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [reviewText, setReviewText] = useState('')

  const [emailIsValid, setEmailIsValid] = useState(true)
  const [emailIsInvalidMessage] = useState('Invalid email')

  const getIsButtonDisabled = () => {
    return isSaving || !username || !email || !reviewText || !emailIsValid
  }

  const closePopupHandler = () => {
    setShowingConfirm(false)
    setEmail('')
    setUsername('')
    setReviewText('')
  }

  const validateEmailHandler = () => {
    setEmailIsValid(validateEmail(email))
  }

  const saveReviewHandler = () => {
    setIsSaving(true)

    apiService
      .saveReview({ email, username, reviewText })
      .then(() => {
        setShowingConfirm(true)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  const getConfirmBody = () => {
    return (
      <div className="confirm">
        <h2 className="confirm__title">Dear {username},</h2>
        <div className="confirm__message">
          Your review
          <blockquote>{reviewText}</blockquote>
          was successfully saved!
        </div>
        <Button style={{ color: 'var(--primary-yellow)' }} onClick={closePopupHandler}>
          Cool
        </Button>
      </div>
    )
  }

  return filmIdForReview ? (
    <ErrorBoundary>
      <Popup body={getConfirmBody()} open={showingConfirm} onClose={closePopupHandler} />

      <Card className="review block">
        <CardContent>
          <form className="review-form" noValidate autoComplete="off">
            <div>
              <CssTextField
                required
                disabled={isSaving}
                id="standard-basic"
                label="Name"
                value={username}
                name="username"
                margin="dense"
                onChange={e => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <CssTextField
                required
                error={!emailIsValid}
                helperText={!emailIsValid && emailIsInvalidMessage}
                disabled={isSaving}
                id="standard-basic"
                label="Email"
                value={email}
                name="email"
                margin="dense"
                onChange={e => setEmail(e.target.value)}
                onBlur={validateEmailHandler}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRounded />
                    </InputAdornment>
                  )
                }}
              />
            </div>

            <CssTextField
              required
              disabled={isSaving}
              id="outlined-multiline-static"
              label="Your review"
              value={reviewText}
              name="review-text"
              margin="dense"
              multiline
              rows={4}
              style={{ width: '100%' }}
              onChange={e => setReviewText(e.target.value)}
            />
          </form>

          <Button
            style={{ color: 'var(--primary-yellow)' }}
            disabled={getIsButtonDisabled()}
            onClick={saveReviewHandler}
          >
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
