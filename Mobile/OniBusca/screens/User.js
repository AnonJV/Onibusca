import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';

const User = ({ route }) => {
    const navigation = useNavigation();
    const { userData } = route.params;

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userData');
        navigation.dispatch(CommonActions.reset({index:0, routes:[{name: 'Home'}]})); 
    };

    const handleLinhas = async () => {
        navigation.navigate('Linhas')
    }

    if (!userData) {
        return (
            <View style={styles.notFound}>
                <Image source={require('')}/>
                <Text style={styles.notFoundText}>Nenhum dado do usuário disponível.</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Logo />
            <View style={styles.nome}>
                <Text style={styles.nomeText}>{userData.nome}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={handleLogout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLinhas}>
                    <Text>Linhas</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.userMain}>
                <Text style={{ fontSize: 20 }}>Email: {userData.email}</Text>
            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    nome: {
        flex: 1,
        padding: 20,
    },
    nomeText: {
        fontSize: 30,
        fontWeight: '600',
    },
    userMain: {
        flex: 3,
        backgroundColor: '#ccc',
        justifyContent: 'top',
        alignItems: 'center'
    },
    notFound: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notFoundText: {
        fontSize: 20,
    }
});

export default User;