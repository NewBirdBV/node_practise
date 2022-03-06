const nativeMap = (arr, cb) => arr.map(cb);

const customMap = (arr, cb) => {
    let ret = [];
    for (let i = 0; i < arr.length; i++ ){
        ret.push(cb(arr[i], i, arr));
    }
    return ret;
}

module.exports = {
    nativeMap,
    customMap
};
