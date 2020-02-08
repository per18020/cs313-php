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

    handleFolderButtonClick(id) {
        this.store.dispatch(selectFolder(id));
        if (id == 0) {
            this.store.dispatch(getAllNotes(getUserState().id));
        } else {
            this.store.dispatch(getNotesInFolder(id));
        }
    }

    buildEventListeners() {
        let buttons = document.getElementsByClassName('collection-button');
        for (let i = 0; i < buttons.length; i++) {
            let button = buttons[i];
            let id = button.getAttribute('folder-id');
            addUniqueTrackedListener(button, 'onclick', this.handleFolderButtonClick.bind(this, id));
        }
    }
}