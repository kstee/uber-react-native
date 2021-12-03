import React, {useState} from 'react';
import {Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const OrderMap = ({car}) => {
  const [region, setRegion] = useState({
    latitude: 3.0788845113974954,
    longitude: 101.42134721276386,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0121,
  });

  const getImage = type => {
    if (type === 'UberX') {
      return require('../../assets/images/top-UberX.png');
    }
    if (type === 'Comfort') {
      return require('../../assets/images/top-Comfort.png');
    }
    return require('../../assets/images/top-UberXL.png');
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
      {car && (
        <Marker
          key={car.id}
          coordinate={{latitude: car.latitude, longitude: car.longitude}}>
          <Image
            style={{
              width: 70,
              height: 70,
              resizeMode: 'contain',
              transform: [
                {
                  rotate: `${car.heading}deg`,
                },
              ],
            }}
            source={getImage(car.type)}
          />
        </Marker>
      )}
    </MapView>
  );
};

export default OrderMap;
