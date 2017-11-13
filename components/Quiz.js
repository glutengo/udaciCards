import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, ScrollView, View, Text, Animated } from 'react-native'
import FlipCard from 'react-native-flip-card'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import TextButton from './TextButton'

const defaultState = {
    index: 0,
    revealAnswer: false,
    answered: 0,
    transformLeft: new Animated.Value(0),
}

class Quiz extends Component {

    state = {
        ...defaultState
    }

    componentDidMount() {
        clearLocalNotification()
            .then(setLocalNotification)
    }

    showNextQuestion(correct) {
        Animated.sequence([
            Animated.timing(this.state.transformLeft, { duration: 300, toValue: -500 }),
            Animated.timing(this.state.transformLeft, { duration: 300, toValue: 0 })
        ]).start()

        setTimeout(() => {
            this.setState(state => ({ index: state.index + 1, revealAnswer: false, answered: correct ? state.answered + 1 : state.answered }))
        }, 100)

    }

    restart() {
        this.resetAnimation()
        this.setState({ ...defaultState })
    }

    resetAnimation() {
        Animated.timing(this.state.transformLeft, { duration: 1, toValue: 0 }).start()
    }

    render() {
        const { deck } = this.props
        const currentQuestion = deck.questions[this.state.index]

        return currentQuestion ? (

            <View style={styles.container}>
                <View>
                    <Text style={styles.quizMeta}>{this.state.index + 1} / {deck.questions.length}</Text>
                </View>
                <Animated.View style={[styles.container, { transform: [{ translateX: this.state.transformLeft }] }]}>
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
                    <TextButton
                        text='Wrong'
                        onPress={() => this.showNextQuestion(false)}
                        buttonStyle={{ backgroundColor: '#c00' }} />
                    <TextButton
                        text='Correct'
                        onPress={() => this.showNextQuestion(true)}
                        buttonStyle={{ backgroundColor: '#0c0' }} />
                </View>
            </View>
        ) : (
                <View style={styles.container}>
                    <Text style={styles.finishedTitle} >Finished!</Text>
                    <Text style={styles.finishedPercentage}>{Math.floor(this.state.answered * 100 / this.props.deck.questions.length)} %</Text>
                    <Text style={styles.finishedAbsolute} >{this.state.answered}/{this.props.deck.questions.length}</Text>
                    <Text style={{margin: 10}}>answered correctly</Text>
                    <TextButton
                        text='Restart Quiz'
                        onPress={() => { this.restart() }} />
                    <TextButton
                        text='Back to Deck'
                        onPress={() => { this.resetAnimation(); this.props.navigation.goBack() }}
                        buttonStyle={{ borderColor: '#000', backgroundColor: '#fff' }}
                        textStyle={{ color: '#000' }} />
                </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    quizMeta: {
        fontSize: 20,
        color: 'rgb(100, 100, 100)'
    },
    cardContainer: {
        marginBottom: 10,
        width: 250,
        borderWidth: 0,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 }
    },
    card: {
        backgroundColor: 'rgb(230, 220, 180)',
        paddingBottom: 50,
        paddingLeft: 20,
        paddingRight: 20
    },
    cardMeta: {
        color: 'rgb(100,100,100)'
    },
    cardText: {
        fontSize: 40,
        textAlign: 'center'
    },
    finishedTitle: {
        textAlign: 'center',
        fontSize: 30
    },
    finishedPercentage: {
        textAlign: 'center',
        fontSize: 100
    },
    finishedAbsolute: {
        textAlign: 'center',
        fontSize: 50,
        color: 'rgb(100,100,100)'
    }
});

function mapStateToProps({ decks }, props) {
    const deckTitle = props.navigation.state.params.deckTitle
    return {
        ...props,
        deck: decks.find(deck => deck.title === deckTitle)
    }
}

export default connect(mapStateToProps)(Quiz)