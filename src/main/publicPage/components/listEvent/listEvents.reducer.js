const initialState = {
    listEvents: [],
    quantity: 0,
    status: '',
    loading: false,
    err: false
};

const request = (state) => {
    state.loading = true;

    return { ...state };
};

const setListEvents = (state, payload) => {
    if (payload) {
        state.listEvents = payload;
        state.loading = false;
    }

    return { ...state };
};

const msgErr = (state, payload) => {
    if (payload) {
        state.err = true;
        state.loading = false;
    }

    return { ...state };
};

export const listEventsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'GET_LIST_EVENTS_REQUEST':
            return request(state);
        case 'GET_LIST_EVENTS_SUCCESS':
            return setListEvents(state, payload);
        case 'GET_LIST_EVENTS_FAIL':
            return msgErr(state, payload);
        default:
            return state;
    }
};