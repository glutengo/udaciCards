import React, { Component } from 'react'
import { Text, View, StatusBar, AppRegistry, Alert } from 'react-native'
import { createStore, compose, applyMiddleware } from 'redux'
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
import { fetchDecks, fetchQuestions, popError } from '../actions'
import { FontAwesome } from '@expo/vector-icons'
import { setLocalNotification } from '../utils/helpers'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <FontAwesome name='list' size={20} />
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus' size={20} />
    }
  }
}, {navigationOptions: {
    headerTitle: 'UdaciCards'
  }})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetails: {
    screen: DeckDetails
  },
  CreateQuestion: {
    screen: CreateQuestion,
    navigationOptions: {
      headerTitle: 'Create Question',
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
    setLocalNotification()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.length) {
      this.showError(nextProps.errors[nextProps.errors.length - 1])
    }
  }

  showError(error) {
    Alert.alert(
      'Error',
      error.message,
      [
        {text: 'OK', onPress: () => this.props.popError()},
      ],
      { cancelable: true }
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor={'rgba(255,0,0,1)'} />
        <MainNavigator />
      </View>
    )
  }
}

function mapStateToProps({ errors }, props) {
  return {
    ...props,
    errors
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    ...props,
    fetchDecks: () => dispatch(fetchDecks()),
    popError: () => dispatch(popError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
