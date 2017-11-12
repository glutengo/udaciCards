import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
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
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.deck.title}</Text>
                <Text style={styles.description}>{this.props.deck.questions.length} Cards</Text>
                <TouchableOpacity 
                    style={[styles.button, { borderColor: '#000', borderWidth: 1 }]}
                    onPress={() => { this.navigateToCreateQuestion() }}>
                    <Text style={{ textAlign: 'center' }}>Add Question</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#000'}]} 
                    onPress={() => { this.navigateToQuiz() }}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50
    },
    title: {
        fontSize: 40,
        margin: 10
    },
    description: {
        fontSize: 30,
        color: 'rgba(0,0,0,0.5)',
        marginBottom: 50
    },
    button: {
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width: '100%'
    }
})

function mapStateToProps(decks, props) {
    const deckTitle = props.navigation.state.params.deckTitle
    return {
        ...props,
        deck: decks.find(deck => deck.title === deckTitle)
    }
}
export default connect(mapStateToProps)(DeckDetails)

