const rootReducer = Redux.combineReducers({
    userReducer, 
    folderReducer
});

const store = Redux.createStore(rootReducer, Redux.applyMiddleware(ReduxThunk.default));

function getUserState() {
    return store.getState().userReducer.user;
}

function getFoldersState() {
    return store.getState().folderReducer.folders;
}