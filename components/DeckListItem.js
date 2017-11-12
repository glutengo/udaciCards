import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'


export default function DeckListItem({ deck, onPress }) {

    return (
        <TouchableOpacity onPress={() => { onPress() }} style={styles.container}>
            <View>
                <Text style={styles.title}>{deck.title}</Text>
                <Text style={styles.description}>{deck.questions.length} Questions</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: 'rgba(150,150,150,0.5)',
        borderBottomWidth: 1,
        padding: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 20
    },
    description: {
        textAlign: 'center'
    }
})