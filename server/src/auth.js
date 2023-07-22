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
  audience: 'https://localhost:8000',
  issuerBaseURL: 'https://introvertedninja.auth0.com/',
});
exports.checkScopes = (0, jwtBearerToken.requiredScopes)('admin');
