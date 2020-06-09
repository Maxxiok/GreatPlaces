import React, {useEffect} from "react";
import {View, Text, StyleSheet, Platform, FlatList} from "react-native";
import {HeaderButton, HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import {useDispatch, useSelector} from "react-redux";
import PlaceItem from "../components/PlaceItem";
import {loadPlaces} from "../store/places-actions";

const PlacesListScreen = props => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(loadPlaces());
    }, [dispatch]);
    const places = useSelector(state => state.places.places);
    return (
        <FlatList data={places} keyExtractor={item=> item.id} renderItem={itemData=><PlaceItem image={itemData.item.imageUri} title={itemData.item.title} address={itemData.item.address}
                   onSelect={()=>props.navigation.navigate({ routeName: 'Details', params: { placeTitle: itemData.item.title, placeId: itemData.item.id}})}/>}/>
        );
};

PlacesListScreen.navigationOptions = navData => {
    return ({
        headerTitle: 'All Places',
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                    <Item title={'Add New Place'} iconName={Platform.OS==='android'?'md-add':'ios-add'} onPress={()=>navData.navigation.navigate('New')}/>
                </HeaderButtons>
            );
        }
    });

};

const styles = StyleSheet.create({

});

export default PlacesListScreen;
