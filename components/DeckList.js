import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, ListView } from 'react-native'
import DeckListItem from './DeckListItem'

class DeckList extends Component {

    navigateToDeck(deck) {
        this.props.navigation.navigate(
            'DeckDetails',
            { deckTitle: deck.title }
        )
    }

    renderRow(deck, index) {
        return (<DeckListItem
            key={deck.title}
            deck={deck}
            onPress={() => this.navigateToDeck(deck)}
        />)
    }

    render() {
        const { decks } = this.props

        return decks ? (
            <ListView
                enableEmptySections={true}
                scrollEnabled
                dataSource={decks}
                renderRow={(deck, index) => this.renderRow(deck, index)}
            />
        ) : null
    }
}

function mapStateToProps({ decks }, props) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const decksArray = Object.keys(decks)
        .map(deckTitle => (decks[deckTitle]))

    return {
        ...props,
        decks: ds.cloneWithRows(decksArray)
    }
}

export default connect(mapStateToProps)(DeckList)