import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import DeckListItem from './DeckListItem'

class DeckList extends Component {

    navigateToDeck(deck) {
        this.props.navigation.navigate(
            'DeckDetails',
            { deckTitle: deck.title }
        )
    }

    render() {
        const { decks } = this.props
        return (
    
            <View>
                {
                    decks.map(deck => (
                        <DeckListItem 
                            key={deck.title} 
                            deck={deck} 
                            onPress={() => this.navigateToDeck(deck)}/>))
                }
            </View>
        )
    }
}

function mapStateToProps(decks, props) {
    return {
        ...props,
        decks
    }
}

export default connect(mapStateToProps)(DeckList)