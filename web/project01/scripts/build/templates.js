function buildFolderColumn(data, callback = () => {}) {
    fetch('/project01/templates/collection-column.handlebars').then((response) => {
        return response.text();
    }).then((response) => {
        document.getElementById("collection-column-target").innerHTML = Handlebars.compile(response)(data);
    }).then(() => callback());
}

function buildNoteColumn(data, callback = () => {}) {
    fetch('/project01/templates/note-column.handlebars').then((response) => {
        return response.text();
    }).then((response) => {
        document.getElementById("note-column-target").innerHTML = Handlebars.compile(response)(data);
    }).then(() => {callback()});
}