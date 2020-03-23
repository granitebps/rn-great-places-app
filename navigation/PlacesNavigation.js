import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import MapScreen from '../screens/MapScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PlacesNavigator = createStackNavigator(
  {
    Places: {
      screen: PlacesListScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'All Places',
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Add Place"
                iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                onPress={() => {
                  navigation.navigate('NewPlace');
                }}
              />
            </HeaderButtons>
          )
        };
      }
    },
    PlaceDetail: {
      screen: PlaceDetailScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: navigation.getParam('placeTitle')
        };
      }
    },
    NewPlace: {
      screen: NewPlaceScreen,
      navigationOptions: {
        headerTitle: 'Add Place'
      }
    },
    Map: {
      screen: MapScreen,
      navigationOptions: ({ navigation }) => {
        const saveFn = navigation.getParam('saveLocation');
        const readOnly = navigation.getParam('readOnly');
        if (readOnly) {
          return {};
        }
        return {
          headerRight: () => (
            <TouchableOpacity onPress={saveFn} style={{ marginHorizontal: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Platform.OS === 'android' ? 'white' : Colors.primary
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          )
        };
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  }
);

export default createAppContainer(PlacesNavigator);
