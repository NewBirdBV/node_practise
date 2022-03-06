const fs = require('fs'),
    stdin = process.stdin,
    stdout = process.stdout;

fs.readdir(process.cwd(), function (err, files) {
    if (!files.length) {
        console.log('\033[31m No files to show!\033[39m\n');
    }
    console.log('请选择\n');

    const stats = [];

    function file(i) {
        const filename = files[i];
        fs.stat(__dirname + '/' + filename, function (err, stat) {
            stats[i] = stat;
            if (stat.isDirectory()) {
                console.log(filename);
            } else {
                console.log(filename);
            }
            i++;
            if (i == files.length) {
                read();
            } else {
                file(i);
            }
        })
    }

    function read() {
        console.log('');
        stdout.write('输入你的选择：');
        stdin.resume();
        stdin.setEncoding('utf8');
        stdin.on('data', option);
    }

    function option(data) {
        const filename = files[Number(data)];
        if (!filename) {
            stdout.write('输入你的选择：');
        } else {
            stdin.pause();
            if (stats[Number(data)].isDirectory()) {
                fs.readdir(`${__dirname}/${filename}`, function (err, files) {
                    console.log('');
                    console.log(`(${files.length} files)`);
                    files.forEach(function (file) {
                        console.log('    -    ', file);
                    });
                    console.log('');
                })
            } else {
                fs.readFile(`${__dirname}/${filename}`, 'utf8', function(err, data) {
                    console.log('');
                    console.log(data.replace(/(.*)g/, '    $1'));
                });
            }
        }
    }

    file(0);
})
