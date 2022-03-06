const connect = require('connect'),
    http = require('http'),
    serverStatic = require('serve-static'),
    morgan = require('morgan'),
    multipart = require('connect-multiparty'),
    fs = require('fs');


const app = connect();

app.use(morgan('combined'));
app.use(serverStatic(`${__dirname}/static`));

app.use(require('./request-time')({
    timeout: 3000
}));

app.use(multipart());
app.use(require('./use-body')({}));

app.use((req, res, next) => {
    if (req.url == '/a') {
        debugger;
        console.log(req.body)
        res.writeHead(200);
        res.end('Fast');
    } else {
        next();
    }
});

app.use((req, res, next) => {
    if (req.url == '/b') {
        setTimeout(() => {
            res.writeHead(200);
            res.end('slow');
        }, 4000)
    } else {
        next();
    }
});


app.use('/upload', (req, res, next) => {
    if (req.method == 'POST') {
        const { path, name, type } = req.files.photos;
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                res.writeHead(500)
                res.end('Error');
                return;
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Method', 'POST');
            res.setHeader('Location', 'http://127.0.0.1:8080/' + 'proxy.html');
            res.writeHead(301);
            res.end();
        });
       /* console.log(req.body);
        res.setHeader('Location', `${req.body.proxy}?callback=${req.body.callback}&arg=success`);
        res.writeHead(301);
        res.end();*/
    } else {
        next();
    }
})

http.createServer(app).listen(3000, function () {
    console.log('app listening on http://localhost:3000');
});

/*
const multipart = function () {
    return (req, res, next) => {
        req.body = '';
        req.files = ''
    }
}

function App() {
    const m_queue = [];
    this.use = (middleware) => {
        m_queue.push(middleware);
    }

    this.next = (err) => {
        let m = null;
        while (m = m_queue.shift()) {
            m(req, res, this.next);
        }
    }

    this.next();
}

*/
