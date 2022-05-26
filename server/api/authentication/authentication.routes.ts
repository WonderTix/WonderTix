import { doesNotMatch } from 'assert';
import { Router } from 'express';
import { createBrotliCompress } from 'zlib';
import { findUser, findUserId } from './authentication.service';

export const authenticationRouter = Router();

var db = require('../db');
var bcrypt = require('bcrypt')//handles our user login info hashing/salting
var express = require('express');//will be handling our sessions
var passport = require('passport');//our authentication middleware
var LocalStrategy = require('passport-local');//strategy used for our authentication middleware
var Bluebird = require('bluebird'); //library for 

const saltRounds: number = 10;

/* 
This is where the username and password are authenticated. We route in the username and password from the login page. 
Hash/salt the password and compare it to the stored db password. 
TODO: route correctly, fully implement bcrypt.compare functionality.
*/
passport.use(new LocalStrategy(async (username: any, password: any, done: any) => {
  const users = await findUser(username);
  if (users.rows.length <= 0) return done(null, false);
  const user = users.rows[0];
  const validated = await bcrypt.compare(password, user.pass_hash);
  if (validated) {
      delete user.pass_hash
      console.log(user)
      return done(null, user);
  } else {
      return done(null, false);
  }
}))

/*
User info is stored in the session after a successful login. 
*/
passport.serializeUser(function(user: any, done: any) {
    done(null, user.id);
  });
  
passport.deserializeUser(async (user: any, done: any) => {
    const targetUser = await findUserId(user.id);
    if(targetUser.rows.length == 1){
      return done(null, user);
    }

    else{
      done("user id not found", false);
    }
  });

  authenticationRouter.post('logout page route', function(req, res) {
    req.logout();
    console.log("successful logout");
    res.redirect('/');//placeholder, but we want to redirect back to the login page
    res.sendStatus(200);
  });
// Here are some examples of how to utilize Bluebird to setup a promise system for authentication. Adapted from example code found in the authentication channel links

passport.serializeUser((user:any, done:any) => {
  done(null, user.userId);
});

passport.deserializeUser((id:any, done:any) => Bluebird.resolve()
  .then(async () => {
    const targetUser = await findUserId(id);

    done(null, targetUser);
  })
  .catch(done));

  passport.use('local', new LocalStrategy(
    (req:any, username:any, password:any, done:any) => Bluebird.resolve()
      .then(async () => {
        const user = await findUserId(user.id);

        if (!user || !await bcrypt.compare(password, user.pass_hash)) {
          return done(null, null);
        }

        return done(null, user);
      })
      .catch(done),
      ));