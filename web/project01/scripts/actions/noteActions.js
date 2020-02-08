const GET_ALL_NOTES_REQUEST = "GET_ALL_NOTES_REQUEST";
const GET_ALL_NOTES_RESPONSE = "GET_ALL_NOTES_RESPONSE";

const GET_NOTES_IN_FOLDER_REQUEST = "GET_NOTES_IN_FOLDER_REQUEST";
const GET_NOTES_IN_FOLDER_RESPONSE = "GET_NOTES_IN_FOLDER_RESPONSE";

const INIT_LAST_SELECTED_NOTE = "INIT_LAST_SELECTED_NOTE";

// const SELECT_NOTE = "SELECT_NOTE";

function getAllNotesRequest() {
    return { type: GET_ALL_NOTES_REQUEST };
}

function getAllNotesResponse(response) {
    return { type: GET_ALL_NOTES_RESPONSE, response };
}

function getAllNotes(user_id) {
    return (dispatch) => {
        dispatch(getAllNotesRequest());
        return fetchAllNotes(user_id)
            .then((res) => { return res.json() })
            .then((res) => {
                dispatch(getAllNotesResponse(res));
            });
    }
}

function getNotesInFolderRequest() {
    return { type: GET_NOTES_IN_FOLDER_REQUEST };
}

function getNotesInFolderResponse(response) {
    return { type: GET_NOTES_IN_FOLDER_RESPONSE, response };
}

function getNotesInFolder(user_id, folder_id) {
    return (dispatch) => {
        dispatch(getNotesInFolderRequest());
        return fetchNotesInFolder(user_id, folder_id)
            .then((res) => { return res.json() })
            .then((res) => {
                dispatch(getNotesInFolderResponse(res));
            });
    }
}

function initLastSelectedNote(user_id) {
    return (dispatch) => {
        return fetchAllFolders(user_id)
            .then((res) => { return res.json() })
            .then((res) => {
                let lookup = [];
                lookup[-1] = 1; // Trash
                lookup[0] = 1; // All Notes
                for (let i = 0; i < res.folders.length; i++) {
                    lookup[res.folders[i].id] = 1;
                }
                dispatch({type: INIT_LAST_SELECTED_NOTE, payload: lookup });
            });
    }
}