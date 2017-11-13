import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function ({ onPress, text, disabled, buttonStyle, textStyle }) {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={[styles.button, buttonStyle, { opacity: disabled ? 0.3 : 1}]}
            onPress={() => onPress()}>
            <Text style={[styles.text, textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: '#000',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0)',
        margin: 10,
    },
    text: {
        textAlign: 'center',
        color: '#fff'
    }
})