import React, {useEffect, useState} from "react";
import {View, Button, Text, ActivityIndicator, Alert, StyleSheet} from "react-native";
import Colors from "../contants/Colors";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from "./MapPreview";

const LocationPicker = props => {

    const [location, setLocation] = useState();
    const [loading, setLoading] = useState(false);

    const pickedLocation = props.navigation.getParam('pickedLocation');

    useEffect(()=>{
        if(pickedLocation){
            setLocation(pickedLocation);
            props.onLocationSet(pickedLocation);
        }
    }, [pickedLocation, props.onLocationSet]);

    const verifyPermissions = async ()=> {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.LOCATION);
        if(result.status !== 'granted'){
            Alert.alert('Insufficient Permissions', 'Please grant location permissions to use this app', [{text: 'OK'}]);
            return false;
        }
        return true;
    };

    const getLocationHandler = async ()=> {
        const permission = await verifyPermissions();
        if(!permission){
            return;
        }

        try{
            setLoading(true);
            const position = await Location.getCurrentPositionAsync({timeout: 5000});
            setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            props.onLocationSet({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        } catch (e) {
            Alert.alert('Could Not Fetch Location', 'Please try again or pick location on the map', [{text: 'OK'}]);
        }
        setLoading(false);
    };

    const pickOnMapHandler = ()=>{
        props.navigation.navigate('Map');
    };

    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={location} onPress={pickOnMapHandler}>
                {loading?<ActivityIndicator size={'large'} color={Colors.primary}/>:<Text>No Location Selected</Text>}
            </MapPreview>
            <View style={styles.buttons}>
                <Button title={'Pick On Map'} onPress={pickOnMapHandler} color={Colors.primary}/>
                <Button title={'Get Location'} onPress={getLocationHandler} color={Colors.primary}/>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 2
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

export default LocationPicker;
