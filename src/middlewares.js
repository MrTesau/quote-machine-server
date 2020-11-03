// error handler for 404's
// route not found (make reqs to something that doesnt exist)
const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

//error handler ( can accept other errors, not just not found)
// all errors will go through here for res
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; //check if error code is 200(ok), change if yes
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? 'Stack Hidden' : error.stack
    })
}
module.exports = {
    notFound,
    errorHandler
}