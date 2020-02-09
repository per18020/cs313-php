const rootReducer = Redux.combineReducers({
    userReducer, 
    folderReducer,
    noteReducer
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

// const store = Redux.createStore(rootReducer, composeEnhancers(
//     Redux.applyMiddleware(createThunkMiddleware())
// ));

const store = Redux.createStore(rootReducer, Redux.applyMiddleware(createThunkMiddleware()));

function getUserState() {
    return store.getState().userReducer.user;
}

function getFoldersState() {
    return store.getState().folderReducer.folders;
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
    return notes.find((note) => {
        return note.selected;
    })?.note;
}