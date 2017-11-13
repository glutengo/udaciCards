export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const CREATE_DECK = 'CREATE_DECK'
export const CREATE_QUESTION = 'CREATE_QUESTION'
export const PUSH_ERROR = 'PUSH_ERROR'
export const POP_ERROR = 'POP_ERROR'
import * as api from '../utils/api'

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export const fetchDecks = () => dispatch => api.getDecks()
    .then(data => dispatch(receiveDecks(data)))

export const createDeck = deckTitle => dispatch => {
    return api.getDeck(deckTitle)
        .then(data => {
            if (data && data.title) {
                return dispatch(pushError({ message: 'Deck already exists' }))
            } else {
                return api.createDeck(deckTitle)
                    .then(() => dispatch(fetchDecks()))
            }
        })
}

export const createQuestion = (deckTitle, question) => dispatch => api.createQuestion(deckTitle, question)
    .then(() => dispatch(fetchDecks()))

export function pushError(error) {
    return {
        type: PUSH_ERROR,
        error
    }
}

export function popError() {
    return {
        type: POP_ERROR
    }
}