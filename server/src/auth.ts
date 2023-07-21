/**
 * Auth
 * Authentification for user longin
 * Wired with Auth Express Library
 * Performs scoping of users and route availabe for them
 */

import {auth, requiredScopes} from 'express-oauth2-jwt-bearer';

export const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_URL,
});

export const checkScopes = requiredScopes('admin');