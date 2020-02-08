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

function getNotesState() {
    return store.getState().noteReducer.notes;
}

function getSelectedNoteState() {
    let selectedFolderID = getSelectedFolderState();
    let selectedNoteID = store.getState().noteReducer.lastSelectedNotes[selectedFolderID];
    return store.getState().noteReducer.notes.find((note) => {
        return note.id == selectedNoteID;
    });
}