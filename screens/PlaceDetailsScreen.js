import React from "react";
import {View, Text, StyleSheet, ScrollView, Image} from "react-native";
import MapPreview from "../components/MapPreview";
import {useSelector} from "react-redux";
import Colors from "../contants/Colors";

const PlaceDetailsScreen = props => {

    const placeId = props.navigation.getParam('placeId');

    const place = useSelector(state=>state.places.places.find(place=>place.id===placeId));

    const showMapHandler = () => {
        props.navigation.navigate('Map', {readonly: true, initialLocation: {lat: place.lat, lng: place.lng}});
    };

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <Image style={styles.img} source={{uri: place.imageUri}}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{place.address}</Text>
                </View>
                <MapPreview style={styles.map} location={{lat: place.lat, lng: place.lng}} onPress={showMapHandler}/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    img: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: '#ccc'
    },
    locationContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
    },
    addressContainer: {
        padding: 20
    },
    address: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary,
        textAlign: 'center'
    },
    map: {
        width: '100%',
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    }
});

PlaceDetailsScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('placeTitle')
    };
};

export default PlaceDetailsScreen;
