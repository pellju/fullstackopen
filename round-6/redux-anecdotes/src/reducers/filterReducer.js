import React from 'react'

export const filterValue = (newValue) => {
    return {
        type: 'NEW_VALUE',
        value: newValue
    }
}

const firstValue = filterValue('')

const changeFilterValue = (state = firstValue, action) => {
    switch (action.type) {
        case 'NEW_VALUE':
            return action
        default:
            return state
    }
}

export default changeFilterValue