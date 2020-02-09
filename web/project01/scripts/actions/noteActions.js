const GET_ALL_NOTES_REQUEST = "GET_ALL_NOTES_REQUEST";
const GET_ALL_NOTES_RESPONSE = "GET_ALL_NOTES_RESPONSE";

const GET_NOTES_IN_FOLDER_REQUEST = "GET_NOTES_IN_FOLDER_REQUEST";
const GET_NOTES_IN_FOLDER_RESPONSE = "GET_NOTES_IN_FOLDER_RESPONSE";

// const SELECT_NOTE = "SELECT_NOTE";

function getAllNotesRequest() {
    return { type: GET_ALL_NOTES_REQUEST };
}

function getAllNotesResponse(folder_id, notes) {
    let formattedNotes = [];
    for (let i = 0; i < notes.length; i++) {
        formattedNotes.push({
            selected: (i == 0), // First in the list is selected by default
            note: notes[i]
        });
    }
    return {
        type: GET_ALL_NOTES_RESPONSE,
        payload: {
            folder_id: folder_id,
            value: formattedNotes
        }
    };
}

function getAllNotes(user_id) {
    return (dispatch) => {
        dispatch(getAllNotesRequest());
        return fetchAllNotes(user_id)
            .then((res) => { return res.json() })
            .then((res) => {

                dispatch(getAllNotesResponse(0, res.notes));
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
                dispatch(getAllNotesResponse(folder_id, res.notes));
            });
    }
}