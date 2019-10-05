import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import api from '../services';

function SpotList({ tech, navigation }) {
    const [spot, setSpot] = useState([]);
    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { tech }
            })
            setSpot(response.data);
        }

        loadSpots();

    }, []);
    function handleNavigate(id) {
        navigation.navigate('Book', {id});
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title} >Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
            <FlatList style={styles.list}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={spot}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url.replace(/localhost/g, '192.168.206.2') }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$ ${item.price}/dia` : 'GRATUITO'}</Text>
                        <TouchableOpacity onPress={()=>handleNavigate(item._id)} style={styles.button}><Text style={styles.buttonText}> Solicitar Reserva</Text></TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item._id}
            />
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        marginTop: 15
    },
    title: {
        fontSize: 18,
        marginLeft: 10,
        marginBottom: 10

    },
    bold: {
        fontWeight: 'bold'

    },
    list: {
        paddingHorizontal: 15
    },
    thumbnail: {
        width: 200,
        height: 124,
        resizeMode: 'cover',
        borderRadius: 4,

    },
    listItem: {
        marginRight: 15
    },
    company: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333'
    },
    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },
    button: {
        borderRadius: 2,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#f05a5b",
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'

    }

})

export default withNavigation(SpotList)