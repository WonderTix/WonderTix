'use strict';
/**
 * Auth
 * Authentification for user longin
 * Wired with Auth Express Library
 * Performs scoping of users and route availabe for them
 */
exports.__esModule = true;
exports.checkScopes = exports.checkJwt = void 0;
const jwtBearerToken = require('express-oauth2-jwt-bearer');
exports.checkJwt = (0, jwtBearerToken.auth)({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_URL,
});
exports.checkScopes = (0, jwtBearerToken.requiredScopes)('admin');
