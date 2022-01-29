import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const newNotification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (newNotification.notification === null || newNotification.notification === undefined){
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

export default Notification