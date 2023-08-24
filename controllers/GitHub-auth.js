import passport from 'passport';
import { Strategy as GitHubStrategy} from "passport-github2"
import express from "express"
import { User } from '../model/userModel.js';
import dotenv from "dotenv"

const router = express.Router();

dotenv.config({
    path: "./config/config.env",
});

let userProfile;
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile)
      const user = await User.findOne({
        accountId: profile.id,
      });
      if (!user) {
        console.log('Adding new github user to DB..');
       const newUser = await User.create({
         accountId: profile.id,
          name: profile.username,
        });
        userProfile=newUser;
        return cb(null, newUser);
      } else {
        userProfile=user
        console.log('Github user already exist in DB..');
        return cb(null, user);
      }
    }
  )
);

router.get('/', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/callback',
  passport.authenticate('github', { failureRedirect: '/auth/github/error',successRedirect:"http://localhost:3000" }),
  function (req, res) {
    res.redirect("done");
  }
);

router.get('/success', async (req, res) => {
  res.json({
    user:userProfile
})
});

router.get("/me", (req, res, next) => {     
  res.status(200).json({
    success: true,
    user: req.user,
  });
})

router.get('/error', (req, res) => res.send('Error logging in via Github..'));

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

export default router
