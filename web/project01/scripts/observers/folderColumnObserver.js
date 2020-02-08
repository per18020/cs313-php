class FolderColumnObserver {
    constructor(store) {
        this.store = store;
        this.init();
    }

    init() {
        this.store.subscribe(this.handleChange.bind(this));
    }

    handleChange() {
        buildFolderColumn({
            folders: getFoldersState(),
            username: getUserState().username,
            selectedFolder: getSelectedFolderState()
        });
    }
}