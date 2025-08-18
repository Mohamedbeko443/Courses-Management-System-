const appError = require("../utils/errorBoundary");
const httpStatusCode = require("../utils/httpStatusText");

module.exports = (...roles) => {



    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            return next(appError.create("this role is not authorized!", 401, httpStatusCode.FAIL));
        }
        next();
    }
}