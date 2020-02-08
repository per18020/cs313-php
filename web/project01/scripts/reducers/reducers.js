const userDefaultState = {
    fetching: false,
    fetched: false,
    user: {}
}

const userReducer = (state = userDefaultState, action) => {
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

const folderDefaultState = {
    fetching: false,
    fetched: false,
    folders: [],
    selectedFolder: 0
}

const folderReducer = (state = folderDefaultState, action) => {
    switch(action.type) {
        case GET_ALL_FOLDERS_REQUEST:
            return Object.assign({}, state, {
                fetching: true
            })
        case GET_ALL_FOLDERS_RESPONSE:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                folders: action.response.folders,
              })
        case SELECT_FOLDER:
            return Object.assign({}, state, {
                selectedFolder: action.id
            })
        default: return state;
    }
} 

const noteDefaultState = {
    fetching: false,
    fetched: false,
    notes: [],
    selectedNote: 0
}

const noteReducer = (state = noteDefaultState, action) => {
    switch(action.type) {
        case GET_ALL_NOTES_REQUEST:
            return {...state, fetching: true};
        case GET_ALL_NOTES_RESPONSE:
            return {
                ...state,
                fetching: false,
                fetched: true,
                notes: action.response.notes,
                selectedNote: 0
            };
        case GET_NOTES_IN_FOLDER_REQUEST: 
            return Object.assign({}, state, {
                fetching: true
            });
        case GET_NOTES_IN_FOLDER_RESPONSE:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                notes: action.response.notes,
                selectedNote: 0
            });
        default: return state;
    }
} 