import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import OrderMap from '../../components/OrderMap';
import {useRoute} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import {getOrder, getCar} from '../../graphql/queries';
import {onCarUpdated, onOrderUpdated} from './subscriptions';

const OrderScreen = () => {
  const [car, setCar] = useState(null);
  const [order, setOrder] = useState(null);

  const route = useRoute();
  console.log(route.params.id);

  // Fetch order on initial render
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await API.graphql(
          graphqlOperation(getOrder, {id: route.params.id}),
        );
        setOrder(orderData.data.getOrder);
      } catch (e) {
        console.error(e);
      }
    };
    fetchOrder();
  }, []);

  // Subscribe to order updates
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onOrderUpdated, {id: route.params.id}),
    ).subscribe({
      next: ({value}) => setOrder(value.data.onOrderUpdated),
      error: error => console.warn(error),
    });
    return subscription.unsubscibe;
  }, []);

  // Fetch Car data when order is updated
  useEffect(() => {
    if (!order?.carId) {
      return;
    }

    const fetchCar = async () => {
      try {
        const carData = await API.graphql(
          graphqlOperation(getCar, {id: order.carId}),
        );
        setCar(carData.data.getCar);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCar();
  }, [order]);

  // Subscribe to car updates
  useEffect(() => {
    if (!order?.carId) {
      return;
    }

    const subscription = API.graphql(
      graphqlOperation(onCarUpdated, {id: order.carId}),
    ).subscribe({
      next: ({value}) => setCar(value.data.onCarUpdated),
      error: error => console.warn(error),
    });
    return subscription.unsubscibe;
  }, [order]);

  return (
    <View style={{flex: 1}}>
      <View style={{height: '60%'}}>
        <OrderMap car={car} />
      </View>
      <View>
        <Text>Order status: {order?.status}</Text>
      </View>
    </View>
  );
};

export default OrderScreen;
