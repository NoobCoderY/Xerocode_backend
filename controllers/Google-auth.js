import passport from 'passport';
// import { Strategy as } from "passport-github2"
import express from "express"
import { User } from '../model/userModel.js';
import dotenv from "dotenv"
import {Strategy as GoogleStrategy} from "passport-google-oauth20"

dotenv.config({
    path: "./config/config.env",
});
 
let userProfile;
const router = express.Router();

 
        passport.use(
            new GoogleStrategy(
              {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_clientSecret,
                callbackURL: process.env.GOOGLE_callbackURL
              },
              async function (accessToken, refreshToken, profile, done) {
                const user = await User.findOne({
                  email:profile.emails[0].value
                });
                userProfile=profile
                if (!user) {
                  const newUser = await User.create({
                    accountId: profile.id,
                    name: profile.displayName,
                      email:profile.emails[0].value
                  });
        
                  return done(null, newUser);
                } else {
                  return done(null, user);
                }
              }
            )
          )
    
    


// request at /auth/google, when user click sign-up with google button transferring
// the request to google server, to show emails screen
router.get(
    '/',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  // URL Must be same as 'Authorized redirect URIs' field of OAuth client, i.e: /auth/google/callback
  router.get(
    '/callback',
    passport.authenticate('google', { failureRedirect: '/auth/google/error',successRedirect:"http://localhost:3000" }),
    (req, res) => {
      res.send("done") // Successful authentication, redirect success.
    }
  );
  
  router.get('/success', async (req, res) => {
      res.json({
          user:userProfile
      })
  });
  
  router.get('/error', (req, res) => res.send('Error logging in via Google..'));
  
  router.get('/signout', (req, res) => {
    try {
        req.session.destroy((err) => {
            res.clearCookie("connect.sid");
            res.status(200).json({
              message: "Logged Out",
            });
          });
    } catch (err) {
      res.status(400).send({ message: 'Failed to sign out user' });
    }
  });

router.get("/me", (req, res, next) => {
      
    res.status(200).json({
      success: true,
      user: req.user,
    });
  })

  export default router
  
