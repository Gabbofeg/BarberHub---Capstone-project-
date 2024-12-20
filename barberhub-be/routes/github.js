const express= require('express')
const github = express.Router()
const passport = require('passport')
const GithubStrategy = require('passport-github2').Strategy
const session = require('express-session')
const jwt = require('jsonwebtoken')
 
require('dotenv').config();

github.use(
    session({
        secret: process.env.GITHUB_CLIENT_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

github.use(passport.initialize())
github.use(passport.session())



passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
}) 

console.log('GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID);
console.log('GITHUB_CLIENT_SECRET:', process.env.GITHUB_CLIENT_SECRET);
console.log('GITHUB_CALLBACK_URL:', process.env.GITHUB_CALLBACK_URL);

passport.use(
    new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    }, (accessToken, refreshToken, profile, done ) => {
        console.log('dati utente:', profile)
        return done(null, profile)
    })
)

github.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }), async ( req, res, next ) => {
    console.log(req.user)
})

github.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/'}), async (req, res, next) => {
    const user = req.user;
    
    const token = jwt.sign(user, process.env.JWT_SECRET);
    const redirectUrl = `http://localhost:3000/success?token=${encodeURIComponent(token)}`
    res.redirect(redirectUrl)
})

    
module.exports = github