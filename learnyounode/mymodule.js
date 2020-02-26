const fs = require('fs')

function filteredLS(dir, ext, callback) {
    ext = "." + ext;
    const files = fs.readdir(dir, (err, files) => {
        if (err) return callback(err);
        callback(null, files.filter(file => file.includes(ext)));
    });
}

module.exports = filteredLS;