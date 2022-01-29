import React from 'react'

let timeoutValue = null

export const clearNotification = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_NOTIFICATION',
            notification: null
        })
    }
}

export const customizedNotification = (newNotification, time) => {
    return dispatch => {
        dispatch({
            type: 'NEW_NOTIFICATION',
            notification: newNotification,
        })

        if (timeoutValue !== null) {
            clearTimeout(timeoutValue)
        }

        timeoutValue = setTimeout(() => {
            dispatch(clearNotification())
        }, time)
    } 
}

const changeNotification = (state = [], action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action
        case 'CLEAR_NOTIFICATION':
            return action
        default:
            return state
    }
}

export default changeNotification