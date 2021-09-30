
function errorHandler(err, req, res, next) {

    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ code:1 ,msg:"Error", error: err });

    }

    if (err.name === 'UnauthorizedError') {

        // jwt authentication error
        return res.status(401).json({ code:2 ,msg:"Error", error: 'Invalid Token' });
    }

    // default to 500 server error
    console.log(err);
    return res.status(500).json({code:3 ,msg:"Error", error: err.message });

}

module.exports = errorHandler;
