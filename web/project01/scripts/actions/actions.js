const GET_USER_REQUEST = "GET_USER_REQUEST";
const GET_USER_RESPONSE = "GET_USER_RESPONSE";

const GET_ALL_FOLDERS_REQUEST = "GET_ALL_FOLDERS_REQUEST";
const GET_ALL_FOLDERS_RESPONSE = "GET_ALL_FOLDERS_RESPONSE";

const SELECT_FOLDER = "SELECT_FOLDER";

const GET_ALL_NOTES_REQUEST = "GET_ALL_NOTES_REQUEST";
const GET_ALL_NOTES_RESPONSE = "GET_ALL_NOTES_RESPONSE";

const GET_NOTES_IN_FOLDER_REQUEST = "GET_NOTES_IN_FOLDER_REQUEST";
const GET_NOTES_IN_FOLDER_RESPONSE = "GET_NOTES_IN_FOLDER_RESPONSE";

// const SELECT_NOTE = "SELECT_NOTE";

function getUserRequest() {
    return { type: GET_USER_REQUEST };
}

function getUserResponse(response) {
    return { type: GET_USER_RESPONSE, response };
}

function getUser(id) {
    return (dispatch) => {
        dispatch(getUserRequest());
        return fetchUser(id)
            .then((res) => { return res.json() })
            .then((res) => {
                dispatch(getUserResponse(res));
            });
    }
}

function getAllFoldersRequest() {
    return { type: GET_ALL_FOLDERS_REQUEST };
}

function getAllFoldersResponse(response) {
    return { type: GET_ALL_FOLDERS_RESPONSE, response };
}

function getAllFolders(id) {
    return (dispatch) => {
        dispatch(getAllFoldersRequest());
        return fetchAllFolders(id)
            .then((res) => { return res.json() })
            .then((res) => {
                dispatch(getAllFoldersResponse(res));
            });
    }
}

function selectFolder(id) {
    return {type: SELECT_FOLDER, id};
}

function getAllNotesRequest() {
    return { type: GET_ALL_NOTES_REQUEST };
}

function getAllNotesResponse(response) {
    return { type: GET_ALL_NOTES_RESPONSE, response };
}

function getAllNotes(id) {
    return (dispatch) => {
        dispatch(getAllNotesRequest());
        return fetchAllNotes(id)
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

function getNotesInFolder(id) {
    return (dispatch) => {
        dispatch(getNotesInFolderRequest());
        return fetchNotesInFolder(id)
            .then((res) => { return res.json() })
            .then((res) => {
                dispatch(getNotesInFolderResponse(res));
            });
    }
}