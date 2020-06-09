import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlacesNavigator from "./navigation/PlacesNavigator";
import * as Font from 'expo-font';
import {AppLoading} from "expo";
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from "redux";
import placesReducer from './store/places-reducer';
import thunk from "redux-thunk";
import {init} from "./helpers/db";

init().then(()=>{
}).catch(err=>console.log(err));

const fetchFonts = async () => {
  await Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  if(!fontsLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={()=>setFontsLoaded(true)} onError={(error)=>console.log(error)}/>
  }

  return (
      <Provider store={store}>
        <PlacesNavigator/>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
