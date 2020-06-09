import React, {useCallback, useEffect, useState} from "react";
import {View, Text, StyleSheet, Platform, TouchableOpacity} from "react-native";
import MapView, {Marker} from "react-native-maps";
import Colors from "../contants/Colors";

const MapScreen = props => {

    const initialLocation = props.navigation.getParam('initialLocation');
    const readOnly =  props.navigation.getParam('readonly');

    const [location, setLocation] = useState(initialLocation);

    const mapRegion = {
        latitude: initialLocation? initialLocation.lat:37.78,
        longitude: initialLocation? initialLocation.lng:-122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    const selectLocationHandler = event=>{
        if(readOnly){
            return;
        }
        setLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        });
    };

    const saveLocationHandler = useCallback(() => {
        if(location){
            props.navigation.navigate('New', {pickedLocation: location});
        }
    }, [location]);

    useEffect(()=> {
        props.navigation.setParams({saveLocation: saveLocationHandler});
    }, [saveLocationHandler]);

    let markerCoordinates;

    if(location){
        markerCoordinates = {
            latitude: location.lat,
            longitude: location.lng
        }
    }

    return (
        <MapView style={styles.map} region={mapRegion} onPress={selectLocationHandler}>
            {markerCoordinates&&<Marker coordinate={markerCoordinates} title={'Picked Location'}/>}
        </MapView>
    );
};

MapScreen.navigationOptions = navData => {
    const readOnly =  navData.navigation.getParam('readonly');
    if(readOnly){
        return {};
    }
    return ({
        headerRight: ()=>{return (<TouchableOpacity style={styles.headerButton} onPress={()=>navData.navigation.getParam('saveLocation')()}><Text style={styles.save}>Save</Text></TouchableOpacity>);}
    });
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20,
    },
    save: {
        fontSize: 16,
        color: Platform.OS==='android'? 'white': Colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default MapScreen;
