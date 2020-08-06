const fs = require('fs');

const writeImageBase64 = (img, dir, filename) => {
    try {
        if(!fs.existsSync(dir))
            fs.mkdirSync(dir);

        const location = dir + '/' + filename;

        const data = img.replace(/^data:image\/\w+;base64,/, '');
        fs.writeFile(location, data, 'base64', (err) => {
            if (err) throw err
        })

        return location;
    } catch (err) {
        throw err;
    }
}

exports.writeImageBase64 = writeImageBase64;
