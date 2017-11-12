import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'


export default function DeckListItem({ deck, onPress }) {

    return (
        <TouchableOpacity onPress={() => { onPress() }}>
            <View>
                <Text>{deck.title}</Text>
                <Text>{deck.questions.length} Questions</Text>
            </View>
        </TouchableOpacity>
    )
}