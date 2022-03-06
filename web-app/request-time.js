module.exports = ({ timeout = 100 }) => {
    return (req, res, next) => {
        const timer = setTimeout(() => {
            console.log(`Timeout Request:::method: ${req.method},url: ${req.url}`);
        }, timeout);
        const end = res.end;
        res.end = function (chunk, encoding) {
            res.end = end;
            res.end(chunk, encoding);
            clearTimeout(timer)
        }
        next();
    };
}
