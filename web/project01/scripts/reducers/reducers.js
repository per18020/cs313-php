const defaultState = {
    fetching: false,
    fetched: false,
    user: {}
}

const userReducer = (state = defaultState, action) => {
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
        default: return state;
    }
}

const defaultState1 = {
    fetching: false,
    fetched: false,
    folders: []
}

const folderReducer = (state = defaultState1, action) => {
    switch(action.type) {
        case GET_ALL_FOLDERS_REQUEST:
            return {...state, fetching: true};
        case GET_ALL_FOLDERS_RESPONSE:
            return {
                ...state,
                fetching: false,
                fetched: true,
                folders: action.response.folders
            };
        default: return state;
    }
} 