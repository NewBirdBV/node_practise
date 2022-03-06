const { readFile } = require('../index');
const add = require('../index');


const assert = require('assert');

describe('add', function () {
    it('should return add result', function() {
        assert.equal(add(1,2), 3);
    });

    it('should return number', function () {
        assert.equal(add('a',2), NaN);
    })
});


describe('readFile', function () {
    it('readFile should be ok', function (done) {
        this.timeout(10);
        readFile(function(err, data) {
            assert.ifError(err);
            assert.equal(JSON.parse(data).name, 'try-mocha');
            done();
        });
    })
});

