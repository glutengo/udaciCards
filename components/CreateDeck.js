import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native'
import { createDeck, PUSH_ERROR } from '../actions'
import TextButton from './TextButton'

class CreateDeck extends React.Component {

    state = {
        title: ''
    }

    createDeck() {
        this.props.createDeck(this.state.title)
            .then(action => {
                if (action.type !== PUSH_ERROR) {
                    this.props.navigation.navigate('DeckList');
                    this.props.navigation.navigate('DeckDetails', {deckTitle: this.state.title})
                    this.setState({ title: '' })
                }
            })
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.title}
                    onChangeText={title => this.setState({ title })}
                />
                <TextButton 
                    disabled={this.state.title.length < 1}
                    text='Submit'
                    onPress={() => this.createDeck()}/>
            </KeyboardAvoidingView>
        )
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        createDeck: title => dispatch(createDeck(title))
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 40
    },
    input: {
        margin: 20,
        padding: 10,
        width: '100%',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5
    }
})

export default connect(null, mapDispatchToProps)(CreateDeck)