import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const newNotification = props.notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (newNotification === null){
    return (
      <div></div>
    )
  } else {
    return (
      <div style={style}>
        {newNotification.notification}
      </div>
    ) 
  }
}

const stateToProps = (state) => {
  if (state.notification.notification === null || state.notification.notification === undefined){
    return {
      notification: null
    }
  } else {
    return {
      notification: state.notification
    }
  }
}

const exportedNotification = connect(stateToProps)(Notification)
export default exportedNotification