const request = require('superagent');

module.exports = function search(query, fn) {
    request.get('http://localhost:3000/api')
        .send({ q: query })
        .end(function (res) {
            if (res.text && Array.isArray(JSON.parse(res.text))) {
                return fn(null, JSON.parse(res.text));
            }
            fn(new Error('Bad message'))
        })
}
