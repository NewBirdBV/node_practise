function getWithSuperAgent() {
    require('superagent')
        .get('www.baidu.com')
        .send({ s: '123' })
        .set('Content-Type', 'text/json')
        .end(function (res) {
            console.log(res.text);
        })
}

getWithSuperAgent();
