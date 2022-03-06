const express = require('express'),
    app = express();


app.use(express.static(`${__dirname}/public`));


var expressWs = require('express-ws')(app);

app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
        console.log(msg);
        setTimeout(() => {
            ws.send('pong');
        }, 3000)

    });
});


app.listen(3000);
