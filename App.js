import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import CreateDeck from './components/CreateDeck'
import DeckDetails from './components/DeckDetails'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { fetchDecks, fetchQuestions } from './actions'
import UdaciCards from './components/UdaciCards'

const store = createStore(reducer, compose(applyMiddleware(thunk)))

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <UdaciCards/>
      </Provider>
    )
  }
}
