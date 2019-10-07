import React, { useState, useEffect } from 'react';
import { Alert, View, AsyncStorage, KeyboardAvoidingView, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import api from '../services';
import logo from '../assets/logo.png';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {

        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List');
            }
        })
    }, []);
    async function handleSubmit() {
        try {
            const response = await api.post('/sessions', {
                email
            })
            const { _id } = response.data;
            await AsyncStorage.setItem('user', _id);
            await AsyncStorage.setItem('techs', techs);
            navigation.navigate('List');
        } catch (error) {
            Alert.alert(error);
        }

    }
    return <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image source={logo} />
        <View style={styles.form}>
            <Text style={styles.label}>SEU E-MAIL *</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu melhor e-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
            ></TextInput>
            <Text style={styles.label}>TECNOLOGIAS *</Text>
            <TextInput
                style={styles.input}
                placeholder="Tecnologias de interesse"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={setTechs}
            ></TextInput>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText} >Encontrar spots</Text>
            </TouchableOpacity>
        </View>

    </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    label: {
        fontWeight: 'bold',
        marginTop: 8,
        color: '#444',
        marginBottom: 6,
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    button: {
        marginTop: 10,
        height: 42,
        backgroundColor: "#f05a5b",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})