class FolderColumnObserver {
    constructor(store) {
        this.store = store;
        this.init();

        this.boundHandlers = [];
    }

    init() {
        this.store.subscribe(this.handleChange.bind(this));
    }

    handleChange() {
        buildFolderColumn({
            folders: getFoldersState(),
            username: getUserState().username,
            selectedFolder: getSelectedFolderState()
        }, () => {
            this.buildEventListeners();
        });
    }

    handleFolderButtonClick(folder_id) {
        let user_id = getUserState().id;
        this.store.dispatch(selectFolder(folder_id));
        if (folder_id == 0) {
            this.store.dispatch(getAllNotes(user_id));
        } else {
            this.store.dispatch(getNotesInFolder(user_id, folder_id));
        }   
    }

    buildEventListeners() {
        let buttons = document.getElementsByClassName('collection-button');
        for (let i = 0; i < buttons.length; i++) {
            let button = buttons[i];
            let folder_id = parseInt(button.getAttribute('folder-id'));
            addUniqueTrackedListener(button, 'onclick', this.handleFolderButtonClick.bind(this, folder_id));
        }
    }
}