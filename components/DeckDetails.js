import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class DeckDetails extends Component {


    navigateToCreateQuestion() {
        this.props.navigation.navigate(
            'CreateQuestion',
            { deckTitle: this.props.deck.title }
        )
    }

    navigateToQuiz() {
        this.props.navigation.navigate(
            'Quiz',
            { deckTitle: this.props.deck.title }
        )
    }

    render() {
        return (
            <View>
                <Text>{this.props.deck.title}</Text>
                <TouchableOpacity onPress={() => { this.navigateToCreateQuestion() }}>
                    <Text>Add Question</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.navigateToQuiz() }}>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(decks, props) {
    const deckTitle = props.navigation.state.params.deckTitle
    return {
        ...props,
        deck: decks.find(deck => deck.title === deckTitle)
    }
}
export default connect(mapStateToProps)(DeckDetails)

