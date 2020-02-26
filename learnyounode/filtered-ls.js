const fs = require('fs')

const dir = process.argv[2];
const ext = "." + process.argv[3];

fs.readdir(dir, (err, files) => {
    if (err) return console.log(err);
    files.filter(file => file.includes(ext)).map(file => console.log(file));
});