const add = (x, y) => Number(x) + Number(y);


/*
const readFile = () => {
    return new Promise((res, rej) => {
        require('fs').readFile('./package.json', 'utf-8', function (err, data) {
            if (err) {
                rej(err);
                throw err;
            }
            res(data);
        });
    });
}
*/


const readFile = (cb) => {
    require('fs').readFile('./package.json', 'utf-8', function (err, data) {
        if (err) {
            cb(err);
            return;
        }
        cb(null, data);
    });
}

module.exports = add;

module.exports.readFile = readFile;
