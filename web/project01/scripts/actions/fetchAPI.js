function fetchUser(user_id) {
    return postData("/project01/api/getUser.php", { id: user_id });
}

function fetchAllFolders(user_id) {
    return postData("/project01/api/getFolders.php", { id: user_id });
}

function fetchAllNotes(user_id) {
    return postData("/project01/api/getAllNotes.php", { id: user_id });
}

function fetchNotesInFolder(folder_id) {
    return postData("/project01/api/getNotesInFolder.php", { id: folder_id });
}