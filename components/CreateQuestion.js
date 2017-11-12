import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { createQuestion } from '../actions'

class CreateQuestion extends React.Component {

    state = {
        question: '',
        answer: ''
    }

    render() {
        return (
            <View style={{flex:1}}>
                <TextInput
                    value={this.state.question}
                    onChangeText={question => this.setState({question})}
                />
                <TextInput
                    value={this.state.answer}
                    onChangeText={answer => this.setState({answer})}
                />
                <TouchableOpacity onPress={() => this.props.createQuestion(this.state)}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        createQuestion: question => dispatch(createQuestion(props.navigation.state.params.deckTitle, question))
    }
}

export default connect(null, mapDispatchToProps)(CreateQuestion)