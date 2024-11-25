import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const Logo = () => {
    return (
        <View style={styles.logo}>
            <Image
            style={styles.image}
                source={require('../assets/logo.png')}
            />
            <Text style={styles.logoText}>OniBusca</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 30,
    },
    logoText: {
        fontSize: 30,
    },
    image: {
        width: 100,
        height: 100,
    }
})

export default Logo