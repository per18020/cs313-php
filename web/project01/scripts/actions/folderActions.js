const GET_ALL_FOLDERS_REQUEST = "GET_ALL_FOLDERS_REQUEST";
const GET_ALL_FOLDERS_RESPONSE = "GET_ALL_FOLDERS_RESPONSE";

const SELECT_FOLDER = "SELECT_FOLDER";

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

function selectFolder(folder_id) {
    return { type: SELECT_FOLDER, folder_id };
}