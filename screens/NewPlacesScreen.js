import React, {useCallback, useState} from "react";
import {View, Text, StyleSheet, ScrollView, Button, TextInput} from "react-native";
import PlacesListScreen from "./PlacesListScreen";
import Colors from "../contants/Colors";
import {useDispatch} from "react-redux";
import {addPlace} from "../store/places-actions";
import ImageSelector from "../components/ImageSelector";
import LocationPicker from "../components/LocationPicker";

const NewPlacesScreen = props => {

    const dispatch = useDispatch();

    const [title, setTitle] = useState('');

    const [image, setImage] = useState(null);

    const [selectedLocation, setSelectedLocation] = useState();

    const titleChangeHandler = txt => {
        setTitle(txt);
    };

    const savePlaceHandler = () => {
        dispatch(addPlace(title, image, selectedLocation));
        props.navigation.goBack();
    };

    const imageTakenHandler = imgPath => {
        setImage(imgPath);
    };

    const saveLocationHandler = useCallback(location => {
        setSelectedLocation(location);
    }, [setSelectedLocation]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} value={title} onChangeText={titleChangeHandler}/>
                <ImageSelector onImageTaken={imageTakenHandler}/>
                <LocationPicker navigation={props.navigation} onLocationSet={saveLocationHandler}/>
                <Button title={'Save Place'} onPress={()=>savePlaceHandler()} color={Colors.primary}/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

NewPlacesScreen.navigationOptions = {
    headerTitle: 'Add New Place'
};

export default NewPlacesScreen;
