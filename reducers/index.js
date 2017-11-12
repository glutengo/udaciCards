import { RECEIVE_DECKS } from '../actions'

export default function decks (state = [], action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return Object.keys(action.decks).map(title => ({
                ...action.decks[title],
            }))
        default: 
            return state
    }
}