Handlebars.registerHelper('is', (one, two, options) => {
    if (one == two) return options.fn(this)
});