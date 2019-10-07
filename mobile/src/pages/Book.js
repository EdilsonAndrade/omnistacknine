import React, { useState } from 'react';
import { Text, Alert, TouchableOpacity, StyleSheet, TextInput, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import api from '../services';
export default function Book({ navigation }) {

    const [date, setDate] = useState('');

    const id = navigation.getParam('id');
    
    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');
        await api.post(`/spots/${id}/bookings`, {
            date
        },
        {
            headers: { user_id }
        })

        Alert.alert("Solicitação de reserva enviada.");
        navigation.navigate('List');
    }
    function handleCancel(){
        navigation.navigate('List');
    }
    return <SafeAreaView style={styles.container}>
        <Text style={styles.label}>DATA DE INTERESSE *</Text>
        <TextInput
            style={styles.input}
            placeholder="Quando data você quer reservar"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={date}
            onChangeText={setDate}
        ></TextInput>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText} >Solicitar Reserva</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
            <Text style={styles.buttonText} >Cancelar Reserva</Text>
        </TouchableOpacity>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container:{
        margin:20
    },  
    label: {
        fontWeight: 'bold',
        marginTop: 8,
        color: '#444',
        marginBottom:22,
    },
    button: {
        marginTop: 2,
        height: 42,
        backgroundColor: "#f05a5b",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    cancelButton: {
        backgroundColor: "#ccc",
     
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})