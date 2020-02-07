const GET_USER_REQUEST = "GET_USER_REQUEST";
const GET_USER_RESPONSE = "GET_USER_RESPONSE";

// const GET_ALL_FOLDERS = "GET_ALL_FOLDERS";
// const GET_ALL_NOTES = "GET_ALL_NOTES";

// const SELECT_FOLDER = "SELECT_FOLDER";
// const SELECT_NOTE = "SELECT_NOTE";

function getUserRequest() {
    return { type: GET_USER_REQUEST };
}

function getUserResponse(response) {
    return { type: GET_USER_RESPONSE, response };
}

function getUser(id) {
    return function (dispatch) {
        dispatch(getUserRequest());
        return fetchUser(id)
            .then((res) => { return res.json() })
            .then((res) => {
                dispatch(getUserResponse(res));
            });
    }
}

// function getAllFolders() {
//     return {type: GET_ALL_FOLDERS};
// }

// function getAllNotes() {
//     return {type: GET_ALL_NOTES};
// }

// function selectFolder(id) {
//     return {type: SELECT_FOLDER, id};
// }

// function selectNote(id) {
//     return {type: SELECT_FOLDER, id};
// }