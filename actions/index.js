export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const CREATE_DECK = 'CREATE_DECK'
export const CREATE_QUESTION = 'CREATE_QUESTION'
import * as api from '../utils/api'

export function receiveDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export const fetchDecks = () => dispatch => api.getDecks()
    .then(data => dispatch(receiveDecks(data)))

export const createDeck = deckTitle => dispatch => api.createDeck(deckTitle)
    .then(() => dispatch(fetchDecks()))

export const createQuestion = (deckTitle, question) => dispatch => api.createQuestion(deckTitle, question)
    .then(() => dispatch(fetchDecks()))