import { RECEIVE_DECKS } from '../actions'
import { PUSH_ERROR } from '../actions'
import { POP_ERROR } from '../actions'
import { combineReducers } from 'redux'

function decks (state = [], action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return Object.keys(action.decks).map(title => ({
                ...action.decks[title],
            }))
        default: 
            return state
    }
}

function errors (state = [], action) {
    switch (action.type) {
        case PUSH_ERROR:
            return state.concat([action.error])
        case POP_ERROR:
            return state.slice(0, -1)
        default:
            return state
    }
}

export default combineReducers({decks, errors})

