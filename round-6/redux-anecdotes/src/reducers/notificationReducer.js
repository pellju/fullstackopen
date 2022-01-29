import React from 'react'

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
        setTimeout(() => {
            dispatch(clearNotification())
        }, time)
    } 
    
    /*return {
        type: 'NEW_NOTIFICATION',
        notification: newNotification
    }*/
}

//const firstNotification = customizedNotification(null)

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