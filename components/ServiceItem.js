import React from 'react';

const ServiceItem = ({ service, dispatch, cartStatus }) => {
    const { id, name, description, price, imageUrl } = service;
    const { isCartItem, count } = cartStatus;
    const handleCartClick = () => {
        if (isCartItem) {
            // If the item is already in the cart, remove it
            dispatch({ type: 'REMOVE_ITEM', payload: id });
        } else {
            // If the item is not in the cart, add it
            dispatch({ type: 'ADD_ITEM', payload: service });
        }
    };

    const handleIncrement = () => {
        // console.log('INCREMENTED...')
        dispatch({ type: 'INCREMENT_ITEM', payload: id });
    }

    const handleDecrement = () => {
        // console.log('DECREMENTED...')
        dispatch({ type: 'DECREMENT_ITEM', payload: id });
    }

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', borderRadius: '5px' }}>
            <img src={imageUrl} alt={name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <h3>{name}</h3>
            <p>{description}</p>
            <p><strong>Price: ${price}</strong></p>
            {
                isCartItem ?
                    <div className="flex gap-2 ">
                        <button
                            onClick={handleDecrement}
                            style={{
                                padding: '10px',
                                backgroundColor: isCartItem ? '#f44336' : '#0070f3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                            }}
                        >
                            -
                        </button>
                        <p className="text-white">{count || 0}</p>
                        <button
                            onClick={handleIncrement}
                            style={{
                                padding: '10px',
                                backgroundColor: isCartItem ? '#f44336' : '#0070f3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                            }}
                        >
                            +
                        </button>
                    </div>
                    :
                    <button
                        onClick={handleCartClick}
                        style={{
                            padding: '10px',
                            backgroundColor: isCartItem ? '#f44336' : '#0070f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                        }}
                    >
                        {isCartItem ? 'Remove from Cart' : 'Add to Cart'}
                    </button>
            }
        </div>
    );
};

export default ServiceItem;
