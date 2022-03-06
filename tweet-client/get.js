let http = require('http'),
    qs = require('querystring');

function getApi() {
    let search = process.argv.slice(2).join(' ').trim();
    if (!search.length) {
        return console.log('\n Usage: node get <search term>\n');
    }
    console.log(`\n searching for: ${search} \n`);
    http.get({
        host: 'www.baidu.com',
        path: `/s?${qs.stringify({ wd: search })}`
    }, function (res) {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            console.log(body)
        })
    })
}


getApi();
