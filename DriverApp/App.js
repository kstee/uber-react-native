/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import Amplify, {Auth, API, graphqlOperation} from 'aws-amplify';
import config from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';
import {getCarId} from './src/graphql/queries';
import {createCar} from './src/graphql/mutations';

Amplify.configure(config);

const App: () => Node = () => {
  const androidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Uber App Location Permission',
          message:
            'Uber App needs access to your location ' +
            'so you can take awesome rides.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      androidPermission();
    } else {
      // IOS
      Geolocation.requestAuthorization();
    }

    const updateUserCar = async () => {
      // Get authenticated user
      const authenticatedUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      if (!authenticatedUser) {
        return;
      }

      // Check if the user has already a car
      const carData = await API.graphql(
        graphqlOperation(getCarId, {id: authenticatedUser.attributes.sub}),
      );

      if (!!carData.data.getCar) {
        console.log('User already has a car assigned');
        return;
      }

      // If not, create a new car for the user
      const newCar = {
        id: authenticatedUser.attributes.sub,
        type: 'UberX',
        userId: authenticatedUser.attributes.sub,
      };
      await API.graphql(graphqlOperation(createCar, {input: newCar}));
    };

    updateUserCar();
  }, []);

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <HomeScreen />
    </>
  );
};

export default withAuthenticator(App);
