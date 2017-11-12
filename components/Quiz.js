import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Animated } from 'react-native'
import FlipCard from 'react-native-flip-card'

class Quiz extends Component {

    state = {
        index: 0,
        revealAnswer: false,
        answered: 0,
        transformLeft: new Animated.Value(0),
    }

    showNextQuestion(correct) {

        Animated.timing(this.state.transformLeft, { duration: 200, toValue: -500}).start()
        Animated.sequence([
            Animated.timing(this.state.transformLeft, { duration: 200, toValue: -500}),
            Animated.timing(this.state.transformLeft, { duration: 200, toValue: 0})
        ]).start()

        setTimeout(() => {
         this.setState(state => ({ index: state.index + 1, revealAnswer: false, answered: correct ? state.answered + 1 : state.answered }))
        }, 200)

    }

    render() {
        const { deck } = this.props
        const currentQuestion = deck.questions[this.state.index]

        return currentQuestion ? (

            <View style={styles.container}>
                    <View>
                        <Text style={styles.quizMeta}>{ this.state.index + 1 } / { deck.questions.length }</Text>
                    </View>
                    <Animated.View style={[styles.container, {transform: [{translateX: this.state.transformLeft}]}]}>
                        <FlipCard
                            perspective={500}
                            friction={5}
                            flipHorizontal={true}
                            flipVertical={false}
                            style={styles.cardContainer}
                            alignWidth={true}
                        >
                            <View style={[styles.card, styles.container]}>
                                <Text style={styles.cardMeta}>Question</Text>
                                <View style={styles.container}>
                                    <Text style={styles.cardText}>{currentQuestion.question}</Text>
                                </View>
                            </View>
                            <View style={[styles.card, styles.container]}>
                                <Text style={styles.cardMeta}>Answer</Text>
                                <View style={styles.container}>
                                    <Text style={styles.cardText}>{currentQuestion.answer}</Text>
                                </View>
                            </View>
                        </FlipCard>
                    </Animated.View>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#0c0' }]} onPress={() => this.showNextQuestion(true)}>
                            <Text style={styles.buttonText}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#c00' }]} onPress={() => this.showNextQuestion(false)}>
                            <Text style={styles.buttonText}>Wrong</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        ) : (
        <View style={styles.container}>
                    <Text>You finished the quiz!</Text>
                    <Text>{this.state.answered} / {this.props.deck.questions.length}</Text>
                    <Text>answered correctly</Text>
                    <Text>{this.state.answered * 100 / this.props.deck.questions.length} %</Text>
                </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quizMeta: {
        fontSize: 20,
        margin: 20,
        color: 'rgb(100, 100, 100)'
    },
    cardContainer: {
        marginBottom: 20,
        width: 250,
        borderWidth: 0,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {width: 0, height: 2}
    },
    card: {
        backgroundColor: 'rgb(230, 220, 180)',
        paddingBottom: 50,
        paddingLeft: 20,
        paddingRight: 20
    },
    cardMeta: {
        margin: 10,
        color: 'rgb(100,100,100)'
    },
    cardText: {
        fontSize: 40,
        textAlign: 'center'
    },
    button: {
        borderRadius: 5,
        padding: 20,
        margin: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff'
    }
});

function mapStateToProps(decks, props) {
    const deckTitle = props.navigation.state.params.deckTitle
    return {
        ...props,
        deck: decks.find(deck => deck.title === deckTitle)
    }
}

export default connect(mapStateToProps)(Quiz)