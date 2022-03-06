const qs = require('querystring');

require('http').createServer(function (req, res) {
    if (req.url == '/') {
        res.writeHead(200, {
            'content-Type': 'text/html',
        });
        res.end([
            '<iframe name="pI"></iframe>',
            '<form method="post" action="https://www.baidu.com">'
            , '<h1>My form</h1>'
            ,   '<fieldset>'
            ,   '<label>Personal information</label>'
            ,   '<p>What is your name?</p>'
            ,   '<input type="text" name="name"/>'
            ,   '<p><button>submit</button></p>'
            ,'</form>'
        ].join(''));
    } else if (req.url == '/url' && req.method == 'POST') {
        let body = '';
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            res.writeHead(200, {
                'content-Type': 'text/html'
            });
            res.end(`<p>Your name is <b>${qs.parse(body).name}</b></p>`);
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
}).listen(3002)
