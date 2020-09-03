import React from 'react'

import Modal from '@material-ui/core/Modal'

const Popup = ({ body, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      {body}
    </Modal>
  )
}

export default Popup
