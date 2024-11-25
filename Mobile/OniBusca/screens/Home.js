import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Footer from '../components/Footer';
import Top from '../components/Top'
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Top />
            <View style={styles.content}>
                <Text style={styles.title}>
                    Para onde <Text style={styles.greenLabel}>você</Text> quer ir?
                </Text>
                <View style={styles.busBox}>
                    <Image
                        source={require('../assets/onibusgreen.png')}
                        style={styles.bus}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.buttonText}>Visualizar linhas</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Footer />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f4f4f4'
    },
    content: {
        flex: 1,
    },
    title: {
        marginTop: 40,
        padding: 5,
        fontSize: 60,
    },
    busBox: {
        border: '2px solid black',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 400,
    },
    button: {
        backgroundColor: '#3C554F',
        borderRadius: 10,
        padding: 10,
        width: '80%',
        alignSelf: 'center'

    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '700'
    },
    bus: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    greenLabel: {
        color: '#3C554F',
    },
});

export default Home