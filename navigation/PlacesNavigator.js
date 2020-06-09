import {Platform} from 'react-native';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import NewPlacesScreen from "../screens/NewPlacesScreen";
import MapScreen from "../screens/MapScreen";
import Colors from "../contants/Colors";

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS==='android'?Colors.primary:''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerTintColor: Platform.OS==='android'?'white':Colors.primary
};

const PlacesNavigator = createStackNavigator({
    Places: PlacesListScreen,
    Details: PlaceDetailsScreen,
    New: NewPlacesScreen,
    Map: MapScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

export default createAppContainer(PlacesNavigator);
