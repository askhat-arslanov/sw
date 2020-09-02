import React, { useContext } from 'react'

import ApiServiceContext from '../components/api-service-context'

const withApi = (Wrapped) => props => {
  const apiService = useContext(ApiServiceContext)

  return <Wrapped {...props} apiService={apiService} />
}

export default withApi
