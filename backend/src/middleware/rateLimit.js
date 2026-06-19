const rateLimit =
require("express-rate-limit");

exports.apiLimiter =
rateLimit({

 windowMs:
 15 * 60 * 1000,

 max:10000,

 message:
 "Too many requests, try again later",
});