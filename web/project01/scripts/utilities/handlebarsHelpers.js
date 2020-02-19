Handlebars.registerHelper('is', (one, two, options) => {
    if (one == two) return options.fn(this)
});

Handlebars.registerHelper('formatDate', (date) => {
    let ms = Date.parse(date);
    if (ms) {
        return moment(ms).fromNow();
    } else {
        return date;
    }
});