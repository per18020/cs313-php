function fetchUser(user_id) {
    return postData("/project01/api/getUser.php", { id: user_id });
}

function fetchAllFolders(user_id) {
    return postData("/project01/api/getFolders.php", { id: user_id });
}

function fetchAllNotes(user_id) {
    return postData("/project01/api/getAllNotes.php", { id: user_id });
}

function fetchNotesInFolder(user_id, folder_id) {
    return postData("/project01/api/getNotesInFolder.php", { user_id, folder_id });
}

function signOutCurrentUser() {
    postData("/project01/api/signOut.php");
}

function createFolder(user_id, folder_title) {
    postData("/project01/api/createFolder.php", { user_id, folder_title });
}

function renameFolder(user_id, folder_id, folder_title) {
    postData("/project01/api/renameFolder.php", { user_id, folder_id, folder_title });
}