import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, KeyboardAvoidingView, StyleSheet, TextInput } from 'react-native'
import { createQuestion } from '../actions'
import TextButton from './TextButton'

class CreateQuestion extends React.Component {

    state = {
        question: '',
        answer: ''
    }

    createQuestion() {
        this.props.createQuestion(this.state)
            .then(() => {
                this.props.navigation.goBack()
            })
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TextInput
                    placeholder='Question'
                    style={styles.input}
                    value={this.state.question}
                    onChangeText={question => this.setState({question})}
                />
                <TextInput
                    placeholder='Answer'
                    style={styles.input}
                    value={this.state.answer}
                    onChangeText={answer => this.setState({answer})}
                />
                <TextButton
                    text='Submit'
                    disabled={this.state.question.length < 1 || this.state.answer.length < 1}
                    onPress={() => this.createQuestion()}
                    buttonStyle={{marginTop: 20}}
                />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },
    input: {
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
        margin: 20,
        width: '100%',
        borderRadius: 5  
    }
})

function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        createQuestion: question => dispatch(createQuestion(props.navigation.state.params.deckTitle, question))
    }
}

export default connect(null, mapDispatchToProps)(CreateQuestion)