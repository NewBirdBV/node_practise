const net = require('net');

let count = 0,
    users = {};


const server = net.createServer(function (conn) {
    let nickName;
    conn.setEncoding('utf8');
    conn.write(`>欢迎来到聊天室\n>还有其他${count}个人\n>请输入你的名称并按下回车：`);
    count++;
    conn.on('data', function (data) {
        data = data.replace('\r\n', '');
        if (!nickName) {
            if (users[data]) {
                conn.write(`>${data}已经被占用，请重试`);
                return;
            } else {
                nickName = data;
                users[nickName] = conn;
                broadcast(`>${nickName}加入聊天室\n`)
            }
        } else {
            broadcast(`>${nickName}：${data}\n`, true);
        }
    });
    conn.on('close', function () {
        count--;
        delete users[nickName];
        broadcast(`>${nickName}退出聊天室`);
    });

    function broadcast(msg, expectMySelf) {
        for (let i in users) {
            if (!expectMySelf || i != nickName) {
                users[i].write(msg);
            }
        }
    }
});

server.listen(3002, function () {
    console.log('server listening on 3002')
});
