Handlebars.registerHelper('is', (one, two, options) => {
    console.log(one, two);
    if (one == two) return options.fn(this)
});