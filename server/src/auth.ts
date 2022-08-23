/**
 * Auth
 * Authentification for user longin
 * Wired with Auth Express Library
 * Performs scoping of users and route availabe for them
 */

import {auth, requiredScopes} from 'express-oauth2-jwt-bearer';

export const checkJwt = auth({
  audience: 'https://localhost:8000',
  issuerBaseURL: `https://wtix-dev.us.auth0.com/`,
});

export const checkScopes = requiredScopes('admin');
