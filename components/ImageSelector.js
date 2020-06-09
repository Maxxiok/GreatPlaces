import React, {useState} from "react";
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import Colors from "../contants/Colors";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const ImageSelector = props => {

    const [pickedImg, setPickedImg] = useState();

    const verifyPermissions = async ()=> {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if(result.status !== 'granted'){
            Alert.alert('Insufficient Permissions', 'Please grant necessary permissions to use this app', [{text: 'OK'}]);
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const permission = await verifyPermissions();
        if(!permission){
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });

        setPickedImg(image.uri);
        props.onImageTaken(image.uri);
    };

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImg?<Text>No Image Picked Yet.</Text>:
                <Image style={styles.image} source={{uri: pickedImg}}/>}
            </View>
            <Button title={'Take Picture'} color={Colors.primary} onPress={takeImageHandler}/>
        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 2
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default ImageSelector;
