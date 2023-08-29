const jwksRsa = require('jwks-rsa');
const jwt = require('express-jwt');
const jwtScope = require('express-jwt-scope');

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 1,
    jwksUri: `${process.env.AUTH0_URL}/.well-known/jwks.json`,
  }),
  credentialsRequired: false,
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_URL,
  algorithms: [`RS256`],
});

export const checkScopes = jwtScope('admin');
