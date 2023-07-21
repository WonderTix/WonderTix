"use strict";
/**
 * Auth
 * Authentification for user longin
 * Wired with Auth Express Library
 * Performs scoping of users and route availabe for them
 */
exports.__esModule = true;
exports.checkScopes = exports.checkJwt = void 0;
var express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
exports.checkJwt = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: 'https://localhost:8000',
<<<<<<< HEAD
    issuerBaseURL: "https://dev-ioqpbmj3lwv6zkir.us.auth0.com"
=======
<<<<<<< Updated upstream
    issuerBaseURL: "https://dev-ioqpbmj3lwv6zkir.us.auth0.com"
=======
    issuerBaseURL: 'https://dev-6tbihuu3m3ttok1i.us.auth0.com'
    // issuerBaseURL: "https://wtix-dev.us.auth0.com/"
>>>>>>> Stashed changes
>>>>>>> 352a0ff31ca8699bca6d947f1ada7a2c873a6ec9
});
exports.checkScopes = (0, express_oauth2_jwt_bearer_1.requiredScopes)('admin');
