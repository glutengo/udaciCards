import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
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
            <View style={{flex:1}}>
                <TextInput
                    value={this.state.title}
                    onChangeText={title => this.setState({title})}
                />
                <TouchableOpacity onPress={() => this.createDeck()} disabled={this.state.title.length}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        createDeck: title => dispatch(createDeck(title))
    }
}

export default connect(null, mapDispatchToProps)(CreateDeck)