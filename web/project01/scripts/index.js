
// Set up quill
// https://quilljs.com/

let bindings = {
    removeFormattingOnBackspace: {
        key: "backspace",
        format: ["header", "code-block"],
        empty: true,
        handler: (range, context) => {
            if (context.format.header) {
                this.quill.format("header", false);
            } else {
                this.quill.format("code-block", false);
            }
        }
    }
}

var quill = new Quill('#editor', {
    theme: 'bubble',
    modules: {
        keyboard: {
            bindings: bindings
        },
        markdownShortcuts: {}
    }
});