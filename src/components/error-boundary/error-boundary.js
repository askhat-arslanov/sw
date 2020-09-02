import React, { Component } from 'react'

import './error-boundary.scss'
import broken from './img/broken.svg'

class ErrorBoundary extends Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.log(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <img src={broken} />
          <p className="error-boundary__text">Oops, something went wrong</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary