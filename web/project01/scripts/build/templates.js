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

function buildCreateFolderModal(data, callback = () => {}) {
    fetch('/project01/templates/create-folder-modal.handlebars').then((response) => {
        return response.text();
    }).then((response) => {
        let modalTarget = document.getElementById("modal-target")
        modalTarget.innerHTML = Handlebars.compile(response)(data);
        modalTarget.parentNode.classList.add("is-active");
        document.getElementById("modal-target-background").addEventListener('click', () => {
            modalTarget.parentNode.classList.remove("is-active");
        })
    }).then(() => callback());
}

function buildRenameFolderModal(data, callback = () => {}) {
    fetch('/project01/templates/rename-folder-modal.handlebars').then((response) => {
        return response.text();
    }).then((response) => {
        let modalTarget = document.getElementById("modal-target")
        modalTarget.innerHTML = Handlebars.compile(response)(data);
        modalTarget.parentNode.classList.add("is-active");
        document.getElementById("modal-target-background").addEventListener('click', () => {
            modalTarget.parentNode.classList.remove("is-active");
        })
    }).then(() => callback());
}

function buildDeleteFolderModal(data, callback = () => {}) {
    fetch('/project01/templates/delete-folder-modal.handlebars').then((response) => {
        return response.text();
    }).then((response) => {
        let modalTarget = document.getElementById("modal-target")
        modalTarget.innerHTML = Handlebars.compile(response)(data);
        modalTarget.parentNode.classList.add("is-active");
        document.getElementById("modal-target-background").addEventListener('click', () => {
            modalTarget.parentNode.classList.remove("is-active");
        })
    }).then(() => callback());
}

function buildCreateNoteModal(data, callback = () => {}) {
    fetch('/project01/templates/create-note-modal.handlebars').then((response) => {
        return response.text();
    }).then((response) => {
        let modalTarget = document.getElementById("modal-target")
        modalTarget.innerHTML = Handlebars.compile(response)(data);
        modalTarget.parentNode.classList.add("is-active");
        document.getElementById("modal-target-background").addEventListener('click', () => {
            modalTarget.parentNode.classList.remove("is-active");
        })
    }).then(() => callback());
}

function buildRenameFolderModal(data, callback = () => {}) {
    fetch('/project01/templates/rename-note-modal.handlebars').then((response) => {
        return response.text();
    }).then((response) => {
        let modalTarget = document.getElementById("modal-target")
        modalTarget.innerHTML = Handlebars.compile(response)(data);
        modalTarget.parentNode.classList.add("is-active");
        document.getElementById("modal-target-background").addEventListener('click', () => {
            modalTarget.parentNode.classList.remove("is-active");
        })
    }).then(() => callback());
}