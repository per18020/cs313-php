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
    return postData("/project01/api/createFolder.php", { user_id, folder_title });
}

function renameFolder(user_id, folder_id, folder_title) {
    return postData("/project01/api/updateFolder.php", { user_id, folder_id, folder_title });
}

function deleteFolder(user_id, folder_id) {
    return postData("/project01/api/deleteFolder.php", { user_id, folder_id });
}

function createNote(user_id, folder_id, note_title) {
    return postData("/project01/api/createNote.php", { user_id, folder_id, note_title, creation: new Date().toISOString() });
}

function updateNote(user_id, note_id, folder_id, note_title, last_edited, note_data) {
    return postData("/project01/api/updateNote.php", { user_id, note_id, folder_id, note_title, last_edited, note_data })
}

function deleteNote(user_id, note_id) {
    return postData("/project01/api/deleteNote.php", { user_id, note_id });
}