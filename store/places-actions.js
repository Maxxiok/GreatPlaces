import * as FileSystem from 'expo-file-system';
import {fetchPlaces, insertPlace} from "../helpers/db";
import ENV from "../env";

export const ADD_PLACE = 'ADD_PLACE';
export const FETCH_PLACES='FETCH_PLACES';

export const addPlace = (title, image, location) => {
    return async dispatch => {
        const fileName =  image.split('/').pop();
        const newPath = FileSystem.documentDirectory+fileName;

        const resp =await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`);

        if (!resp.ok) {
            throw new Error('Error fetching google api data');
        }

        const resData = await resp.json();
        if(!resData.results){
            throw new Error('Error fetching google api data');
        }

        const address= resData.results[0].formatted_address;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(title, newPath, address, location.lat, location.lng);
            dispatch({type: ADD_PLACE, placeData: {id: dbResult.insertId,title: title, image: newPath, address: address, coords: {lat: location.lat, lng: location.lng}}});
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
};

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const data = await fetchPlaces();
            dispatch({type: FETCH_PLACES, places: data.rows._array});
        } catch (e) {
            console.log(e);
            throw e;
        }
    };
};
