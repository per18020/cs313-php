const rootReducer = Redux.combineReducers({
    userReducer, 
    folderReducer,
    noteReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

const store = Redux.createStore(rootReducer, composeEnhancers(
    Redux.applyMiddleware(createThunkMiddleware())
));

// const store = Redux.createStore(rootReducer, Redux.applyMiddleware(createThunkMiddleware()));

function getUserState() {
    return store.getState().userReducer.user;
}

function getFoldersState() {
    return store.getState().folderReducer.folders;
}

function getFolderState(folder_id) {
    return store.getState().folderReducer.folders.find((folder) => {
        return folder.id == folder_id;
    });
}

function getSelectedFolderState() {
    return store.getState().folderReducer.selectedFolder;
}

function getNotesInSelectedFolderState() {
    let folder_id = getSelectedFolderState();
    return store.getState().noteReducer.folders.get(folder_id);
}

function getSelectedNoteState() {
    let notes = getNotesInSelectedFolderState();
    if (!notes) return;
    let noteObj = notes.find((note) => {
        return note.selected;
    });
    return noteObj ? noteObj.note : noteObj;
}

function getNoteState(note_id) {
    let notes = getNotesInSelectedFolderState();
    if (!notes) return;
    let noteObj = notes.find((obj) => {
        return obj.note.id == note_id;
    });
    return noteObj ? noteObj.note : noteObj;
}
