import React, { Component } from 'react'
import { Text, View, StatusBar, AppRegistry } from 'react-native'
import { createStore, compose, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckList from './DeckList'
import CreateDeck from './CreateDeck'
import DeckDetails from './DeckDetails'
import CreateQuestion from './CreateQuestion'
import Quiz from './Quiz'
import { connect } from 'react-redux'
import { fetchDecks, fetchQuestions } from '../actions'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      headerTitle: 'DeckList',
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      headerTitle: 'CreateDeck',
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerTitle: 'DeckDetails',
    }
  },
  CreateQuestion: {
    screen: CreateQuestion,
    navigationOptions: {
      headerTitle: 'CreateQuestion',
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTitle: 'Quiz',
    }
  }
})

class App extends Component {

  componentDidMount() {
    this.props.fetchDecks()
  }

  render() {
    return (
        <View style={{flex:1}}>
          <StatusBar translucent backgroundColor={'rgba(255,0,0,1)'} barStyle={'light-content'}/>
          <MainNavigator />
        </View>
    )
  }
}

function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        fetchDecks: () => dispatch(fetchDecks())
    }
}

export default connect(null, mapDispatchToProps)(App)
