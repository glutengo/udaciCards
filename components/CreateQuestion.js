import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { createQuestion } from '../actions'

class CreateQuestion extends React.Component {

    state = {
        question: '',
        answer: ''
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
                <TouchableOpacity
                    style={styles.button} 
                    onPress={() => this.props.createQuestion(this.state)}>
                    <Text style={styles.buttonText} >Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 50
    },
    input: {
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
        margin: 10,
        width: '100%'  
    },
    button: {
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1
    },
    buttonText: {
        textAlign: 'center'
    }
})

function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        createQuestion: question => dispatch(createQuestion(props.navigation.state.params.deckTitle, question))
    }
}

export default connect(null, mapDispatchToProps)(CreateQuestion)