const TokenMiddleware = (req, res, next) => {
    console.log(req.query.token);
    console.log(process.env.TOKEN);
    if (req.query.token == process.env.TOKEN) {
        next();
    } else {
        res.send('Unauthorized!');
    }
};
module.exports = {TokenMiddleware};
