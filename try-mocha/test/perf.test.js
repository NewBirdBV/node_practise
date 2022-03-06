const Benchmark = require('benchmark');

const { nativeMap, customMap } = require('../perf');


const cb = function (value, index, arr) {
    return value;
};

const arr = [1,2,3,4,5,6];

const suite = new Benchmark.Suite();


suite
    .add('nativeMap', function () {
        return nativeMap(arr, cb);
    })
    .add('customMap', function () {
        return customMap(arr, cb);
    })
    .on('cycle', function (event) {
       console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    }).run();
