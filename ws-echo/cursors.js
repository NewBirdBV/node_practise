const express = require('express'),
    app = express();


app.use(express.static(`${__dirname}/public`));


var expressWs = require('express-ws')(app);

let positions = {},
    total = 0;

app.ws('/', function(ws, req) {
    ws.id = ++ total;
    ws.send(JSON.stringify(positions));

    ws.on('message', function(msg) {
        let pos = null;
        try {
            pos = JSON.parse(msg);
        } catch (e) {
            return;
        }
        positions[ws.id] = pos;
        broadcast(JSON.stringify({ type: 'position', pos, id: ws.id }))
    });

    ws.on('close', function () {
        delete positions[ws.id];
        broadcast(JSON.stringify({ type: 'disconnect', id: ws.id }))
    });

    function broadcast(msg) {
        const clients = Array.from(expressWs.getWss().clients);
        for (let i = 0; i < clients.length; i++) {
            if (clients[i] && ws.id !== clients[i].id) {
                clients[i].send(msg);
            }
        }
    }
});



app.listen(3000);
