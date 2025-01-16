'use client'

import React, { useReducer, useEffect } from 'react';
import ServiceItem from '@/components/ServiceItem';
import { servicesReducer, initialState } from '@/reducers/servicesReducer';
import { cartReducer, initialCartState } from '@/reducers/cartReducer';
import dummyData from "@/lib/dummyData";


const isCartItem = (cartItems, item) => {
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id === item.id) {
      return { isCartItem: true, count: cartItems[i].count };
    }
  }
  return { isCartItem: false, count: 0 };

}

const Services = () => {
  const [state, dispatch] = useReducer(servicesReducer, initialState);
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  // Simulate data fetching
  useEffect(() => {
    const fetchServices = () => {
      dispatch({ type: 'FETCH_SERVICES_REQUEST' });

      try {
        // Simulating an API call delay with a timeout
        setTimeout(() => {
          dispatch({ type: 'FETCH_SERVICES_SUCCESS', payload: dummyData });
        }, 50);
      } catch (error) {
        dispatch({ type: 'FETCH_SERVICES_FAILURE', payload: 'Failed to fetch services.' });
      }
    };

    fetchServices();
  }, []);

  const { loading, error, services } = state;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Our Services</h1>

      {loading && <p>Loading services...</p>}
      {error && <p>{error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {services.map(service => {
          return <ServiceItem key={service.id} service={service} dispatch={cartDispatch} cartStatus={isCartItem(cartState, service)} />
        }
        )}
      </div>
    </div>
  );
};

export default Services;
