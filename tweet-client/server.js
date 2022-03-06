const qs = require('querystring');

module.exports = require('http').createServer(function (req, res) {
    let body = '';
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        res.writeHead(200);
        console.log(`\n got name ${qs.parse(body).name}\n`);
        res.end('Done');
    });
})
