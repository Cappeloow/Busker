// config/passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import User from '../entities/user.js';
import dotenv from 'dotenv';
dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback: true,
},
    async function (request, accessToken, refreshToken, profile, done) {
        try {
            // looking for a user in the fb with the same email adress as we trying to authenticate with on google auth.
            let user = await User.findOne({ where: { Email: profile.emails[0].value } });
            if (!user) {
                user = await User.create({
                    Email: profile.emails[0].value,
                    ArtistName: profile.displayName ? profile.displayName : null,
                    CreatedAt: new Date(),
                });
            } else {
                console.log("There is a user already registered with this email");
            }

            return done(null, user);
        } catch (error) {
            console.error('Authentication Error:', error);
            return done(error, null);
        }
    }

));

passport.serializeUser(function (user, done) {
    done(null, user.UserID);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
