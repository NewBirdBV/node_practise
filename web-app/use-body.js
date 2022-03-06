module.exports = function ({ options }) {
    return function (req, res, next) {
        const chunks = [];
        req.on('data', (c) => {
            chunks.push(c);
        });

        req.on('end', () => {
            try {
                req.body = {};
                if (chunks.length) {
                    req.body = JSON.parse(Buffer.concat(chunks).toString('utf-8'));
                }
                next();
            } catch (e) {
                next(e);
            }
        });
    }
}
