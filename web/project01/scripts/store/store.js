const defaultState = {
    fetching: false,
    fetched: false,
    user: {},
}

const userReducer = function counter(state = defaultState, action) {
    switch (action.type) {
        case GET_USER_REQUEST:
            return {...state, fetching: true};
        case GET_USER_RESPONSE:
            return {
                ...state, 
                fetching: false,
                fetched: true,
                user: action.response
            };
        default:
            return state
    }
}

const store = Redux.createStore(userReducer, Redux.applyMiddleware(ReduxThunk.default));