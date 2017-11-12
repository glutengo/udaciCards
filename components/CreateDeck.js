import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { createDeck } from '../actions'

class CreateDeck extends React.Component {

    state = {
        title: ''
    }

    createDeck() {
        this.props.createDeck(this.state.title)
        this.setState({ title: '' })
        this.props.navigation.navigate('DeckList');
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.createDeck()}
                    disabled={this.state.title.length < 1}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
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
        borderColor: '#000000',
        borderWidth: 1
    },
    button: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5 
    },
    buttonText: {
        color: '#fff'
    }
})

export default connect(null, mapDispatchToProps)(CreateDeck)