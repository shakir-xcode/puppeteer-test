export const initialCartState = []


function itemExists(array, itemId) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === itemId) {
            return true;
        }
    }
    return false;
}


export const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM": {
            // check whether item is already in the card
            if (itemExists(state, action.payload.id))
                return state;
            const newState = [...state, { id: action.payload.id, name: action.payload.name, price: action.payload.price, count: 1 }];
            console.log(newState);
            return newState;
        }

        case "INCREMENT_ITEM": {
            // Create new state with updated count
            return state.map(item =>
                item.id === action.payload
                    ? { ...item, count: item.count + 1 }
                    : item
            );
        }

        case "DECREMENT_ITEM": {
            // Create new state with updated count or filter out the item if count is 1
            return state
                .map(item =>
                    item.id === action.payload
                        ? { ...item, count: item.count - 1 }
                        : item
                )
                .filter(item => item.count > 0); // Remove item if count is 0
        }


        default:
            return state;
    }
};

