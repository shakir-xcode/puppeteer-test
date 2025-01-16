export const initialState = {
    loading: false,
    error: null,
    services: [],
};

export const servicesReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SERVICES_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_SERVICES_SUCCESS':
            return { ...state, loading: false, services: action.payload };
        case 'FETCH_SERVICES_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
