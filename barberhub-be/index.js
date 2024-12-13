const express = require('express')
const { default: mongoose } = require('mongoose')
const PORT = 4040
const cors = require('cors')
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const authRoutes = require('../barberhub-be/routes/Auth')
const User = require("../barberhub-be/models/userModel");


require('dotenv').config()

const server = express()

const usersRoute = require('./routes/users')
const productsRoute = require('./routes/products')
const availabilityRoute = require('./routes/availability')

server.use(express.json())
server.use(cors());
server.use(passport.initialize());

server.use('/', usersRoute),
server.use('/Prodotti', productsRoute),
server.use('/availability', availabilityRoute),

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Db connection error'))
db.once('open', () => {
    console.log('Db connected successfully')
})

// passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://localhost:4040/api/auth/google/callback",
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         try {
//           let user = await User.findOne({ googleId: profile.id });
//           if (!user) {
//             user = await User.create({ email: profile.emails[0].value, googleId: profile.id, provider: "google" });
//           }
//           done(null, user);
//         } catch (err) {
//           done(err, null);
//         }
//       }
//     )
//   );

// passport.use(
//     new GitHubStrategy(
//       {
//         clientID: process.env.GITHUB_CLIENT_ID,
//         clientSecret: process.env.GITHUB_CLIENT_SECRET,
//         callbackURL: "http://localhost:4040/api/auth/github/callback",
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         try {
//           let user = await User.findOne({ githubId: profile.id });
//           if (!user) {
//             user = await User.create({ email: profile.emails[0].value, githubId: profile.id, provider: "github" });
//           }
//           done(null, user);
//         } catch (err) {
//           done(err, null);
//         }
//       }
//     )
//   );


server.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))