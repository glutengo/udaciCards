import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'

class Quiz extends Component {

    state = {
        index: 0,
        revealAnswer: false,
        answered: 0
    }

    showNextQuestion(correct) {
        this.setState(state => ({ index: state.index + 1, revealAnswer: false, answered: correct ? state.answered + 1: state.answered}))
    }

    render() {
        const { deck } = this.props
        const currentQuestion = deck.questions[this.state.index]

        return (
            <View>
                <View>
                    <Text>{this.props.deck.title}</Text>
                </View>
                {currentQuestion ? (
                    <View>
                        <Text>{currentQuestion.question}</Text>
                        { this.state.revealAnswer && (<Text>{currentQuestion.answer}</Text>)}
                        <TouchableOpacity onPress={() => this.setState({revealAnswer: true})}>
                            <Text>Show Answer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.showNextQuestion(true)}>
                            <Text>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.showNextQuestion(false)}>
                            <Text>Wrong</Text>
                        </TouchableOpacity>
                    </View>
                ) : (<View>
                        <Text>You finished the quiz!</Text>
                        <Text>{this.state.answered} / {this.props.deck.questions.length}</Text>  
                        <Text>answered correctly</Text>   
                        <Text>{this.state.answered / this.props.deck.questions.length} %</Text>  
                    </View>)}
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

export default connect(mapStateToProps)(Quiz)