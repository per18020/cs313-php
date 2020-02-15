const userDefaultState = {
    fetching: false,
    fetched: false,
    user: {}
}

const userReducer = (state = userDefaultState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return { ...state, fetching: true };
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
    switch (action.type) {
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
                selectedFolder: parseInt(action.folder_id)
            })
        default: return state;
    }
}

const noteDefaultState = {
    fetching: false,
    fetched: false,
    filtered: false,
    folders: Immutable.Map(),
    filteredFolders: Immutable.Map()
}

// folders: 
// { -- Dict addresed by folder_id
//     [ -- List of notes in that folder
//         { -- Object that contains the note and whether or not it's selected
//             note: {},
//             selected: false
//         }
//     ]
// }

const noteReducer = (state = noteDefaultState, action) => {
    switch (action.type) {
        case GET_ALL_NOTES_REQUEST:
            return { ...state, fetching: true };
        case GET_NOTES_IN_FOLDER_REQUEST:
            return { ...state, fetching: true };
        case GET_ALL_NOTES_RESPONSE:
            return {
                ...state,
                fetching: false,
                fetched: true,
                folders: state.folders.set(parseInt(action.payload.folder_id), action.payload.value)
            };
        case SELECT_NOTE:
            return {
                ...state,
                folders: state.folders.set(parseInt(action.payload.folder_id), action.payload.value)
            }
        case UPDATE_SELECTED_NOTE:
            return {
                ...state,
                folders: state.folders.set(action.payload.folder_id, action.payload)
            }
        default: return state;
    }
} 