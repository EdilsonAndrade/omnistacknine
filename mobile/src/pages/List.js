import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { SafeAreaView, Text, Image, StyleSheet, ScrollView } from 'react-native';
import logo from '../assets/logo.png';
import api from '../services';
import SpotList from '../components/SpotList';

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {

        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techArrays = storagedTechs.split(',').map(tech => tech.trim());
            setTechs(techArrays);
        })
    })
    return <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logo}></Image>
        <ScrollView>
            {techs.map(tech => <SpotList key={tech} tech={tech} />)}
        </ScrollView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 20
    }
})