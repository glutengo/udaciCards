import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'

class DeckDetails extends Component {

    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params

        return {
            title: deckTitle
        }
    }

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
                <TextButton
                    text='Add Question'
                    onPress={() => { this.navigateToCreateQuestion() }} />
                <TextButton
                    disabled={this.props.deck.questions.length < 1}
                    text='Start Quiz'
                    onPress={() => { this.navigateToQuiz() }}
                    buttonStyle={{ borderColor: '#000', backgroundColor: '#fff' }}
                    textStyle={{ color: '#000' }} />
                {this.props.deck.questions.length < 1 && (
                    <Text style={{ textAlign: 'center' }}>
                        You need to add questions before you can do the quiz
                    </Text>
                )}
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
        fontSize: 50,
        margin: 10
    },
    description: {
        fontSize: 30,
        color: 'rgb(100,100,100)',
        margin: 20
    }
})

function mapStateToProps({ decks }, props) {
    const deckTitle = props.navigation.state.params.deckTitle
    return {
        ...props,
        deck: decks.find(deck => deck.title === deckTitle)
    }
}
export default connect(mapStateToProps)(DeckDetails)

