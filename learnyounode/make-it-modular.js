const filteredLS = require('./mymodule');

const dir = process.argv[2];
const ext = process.argv[3];

filteredLS(dir, ext, (err, files) => {
    if (err) return console.log(err);
    files.map(file => console.log(file));
})