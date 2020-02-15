const GET_ALL_NOTES_REQUEST = "GET_ALL_NOTES_REQUEST";
const GET_ALL_NOTES_RESPONSE = "GET_ALL_NOTES_RESPONSE";

const GET_NOTES_IN_FOLDER_REQUEST = "GET_NOTES_IN_FOLDER_REQUEST";
const GET_NOTES_IN_FOLDER_RESPONSE = "GET_NOTES_IN_FOLDER_RESPONSE";

const SELECT_NOTE = "SELECT_NOTE";

const UPDATE_SELECTED_NOTE = "UPDATE_SELECTED_NOTE";

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

function selectNote(note_id) {
    let folder_id = getSelectedFolderState();
    let notes = getNotesInSelectedFolderState();
    for (let i = 0; i < notes.length; i++) {
        notes[i].selected = false;
        if (notes[i].note.id == note_id) {
            notes[i].selected = true;
        }
    }
    return { type: SELECT_NOTE, payload: { folder_id, value: notes } };
}

function getAllNotesInFolders(user_id) {
    return (dispatch) => {
        return fetchAllFolders(user_id)
            .then((res) => { return res.json() })
            .then((res) => {
                res.folders.forEach(folder => {
                    dispatch(getNotesInFolder(user_id, folder.id));
                });
            });
    }
}

function updateSelectedNote(options = {}) {
    let selectedNote = getSelectedNoteState();
    if (selectedNote) {
        selectedNote.title = (options.title) ? options.title : selectedNote.title;
        selectedNote.data = (options.data) ? options.data : selectedNote.data;
        return { type: UPDATE_SELECTED_NOTE, payload: { selected: true, note: selectedNote} };
    }
    return { type: "" };
}

function saveCurrentNote() {
    let noteState = getSelectedNoteState();
    if (noteState) {
        let user_id = getUserState().id;
        let note_id = noteState.id;
        let folder_id = noteState.folder_id;
        let note_title = noteState.title;
        let note_data = JSON.stringify(quill.getContents());
        return updateNote(user_id, note_id, folder_id, note_title, note_data);
    }
    return Promise.resolve();
} 