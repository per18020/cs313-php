const rootReducer = Redux.combineReducers({
    userReducer, 
    folderReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

const store = Redux.createStore(rootReducer, composeEnhancers(
    Redux.applyMiddleware(ReduxThunk.default)
));

function getUserState() {
    return store.getState().userReducer.user;
}

function getFoldersState() {
    return store.getState().folderReducer.folders;
}