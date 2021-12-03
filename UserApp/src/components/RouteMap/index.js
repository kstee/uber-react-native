import React, {useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCh0_IlSpqQImpVuqkZ1pFGQ-I7AXdrv0c';

const RouteMap = ({origin, destination}) => {
  const [region, setRegion] = useState({
    latitude: 3.0788845113974954,
    longitude: 101.42134721276386,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0121,
  });

  const originLoc = {
    latitude: origin.details.geometry.location.lat,
    longitude: origin.details.geometry.location.lng,
  };

  const destinationLoc = {
    latitude: destination.details.geometry.location.lat,
    longitude: destination.details.geometry.location.lng,
  };

  return (
    <MapView
      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      // initialRegion={{
      //   latitude: 28.450627,
      //   longitude: -16.263045,
      //   latitudeDelta: 0.0222,
      //   longitudeDelta: 0.0121,
      // }}>
      region={region}
      onRegionChangeComplete={region => setRegion(region)}>
      <MapViewDirections
        origin={originLoc}
        destination={destinationLoc}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={5}
        strokeColor="black"
      />
      <Marker coordinate={originLoc} title={'Origin'} />
      <Marker coordinate={destinationLoc} title={'Destination'} />
    </MapView>
  );
};

export default RouteMap;
