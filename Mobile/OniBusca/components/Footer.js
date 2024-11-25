import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
    return (
        <Text style={styles.footer}>@OrkaShield</Text>
    )
}

const styles = StyleSheet.create({
    footer: {
        fontSize: 16,
        textAlign: 'center',
        bottom: '0',
    }
});

export default Footer