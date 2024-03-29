import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import styles from './styles';

import Ionicons from 'react-native-vector-icons/Ionicons';

const UberTypeRow = props => {
  const {id, price, type, duration, onPress, isSelected} = props;

  const getImage = () => {
    if (type === 'UberX') {
      return require('../../assets/images/UberX.jpeg');
    }
    if (type === 'Comfort') {
      return require('../../assets/images/Comfort.jpeg');
    }
    return require('../../assets/images/UberXL.jpeg');
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: isSelected ? '#efefef' : 'white',
        },
      ]}>
      {/* Image */}
      <Image style={styles.image} source={getImage()} />

      <View style={styles.middleContainer}>
        <Text style={styles.type}>
          {type} <Ionicons name={'person'} size={16} />3
        </Text>
        <Text style={styles.time}>8:03PM drop off</Text>
      </View>
      <View style={styles.rightContainer}>
        <Ionicons name={'pricetag'} size={18} color={'#42d742'} />
        <Text style={styles.price}>est. ${price}</Text>
      </View>
    </Pressable>
  );
};

export default UberTypeRow;
