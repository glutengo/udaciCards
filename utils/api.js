const DECKS_STORAGE_KEY = 'UdaciCards:decks'
import { AsyncStorage } from 'react-native'


AsyncStorage.clear()
export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(data => data ? JSON.parse(data) : {})
}

export function getDeck(title) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(data => data ? JSON.parse(data) : {})
        .then(data => data[title])
}

export function createDeck(title) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({[title]: {title, questions: [] } }))
}

export function createQuestion(deckTitle, question) {
    return getDeck(deckTitle)
        .then(data => {
            if (data) {
                data.questions.push(question)
                return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({ [deckTitle]: data }))
            } else {
                return
            }
        })
}

