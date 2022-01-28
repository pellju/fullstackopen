export const customizedNotification = (newNotification) => {
    return {
        type: 'NEW_NOTIFICATION',
        notification: newNotification
    }
}

const firstNotification = customizedNotification(null)

const changeNotification = (state = firstNotification, action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            console.log("new-notification:" + action.notification)
            return action
        default:
            return state
    }
}

export default changeNotification