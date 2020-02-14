Handlebars.registerHelper('is', (one, two, options) => {
    if (one == two) return options.fn(this)
});

Handlebars.registerHelper('formatDate', (date, options) => {
    let ms = Date.parse(date);
    if (ms) {
        let dateObj = new Date(ms);
        return dateObj.toDateString();
    } else {
        return date;
    }
});

Handlebars.registerHelper('overflowEllipsis', (text, length) => {
    if (text.length > length) {
        return text.substring(0, length - 3) + "...";
    }
    return text;
});