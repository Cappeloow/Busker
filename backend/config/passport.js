// config/passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import User from '../entities/user.js';
import dotenv from 'dotenv';
dotenv.config();
import initStripe from '../stripe.js';
const stripe = initStripe();


// Configure passport to use Google OAuth2 strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback: true,
},
    async function (request, accessToken, refreshToken, profile, done) {
        try {
            // looking for a user in the db with the same email address as we are trying to authenticate with on Google auth.
            let user = await User.findOne({ where: { email: profile.emails[0].value } });

            if (!user) {
                // Retrieve the Stripe customer ID based on the email address
                const stripeCustomer = await stripe.customers.list({ email: profile.emails[0].value, limit: 1 });

                if (stripeCustomer.data.length === 0) {
                    // If no Stripe customer is found, create one
                    const createdStripeCustomer = await stripe.customers.create({
                        email: profile.emails[0].value,
                    });
                    // Create the user in the database with the Stripe customer ID
                    user = await User.create({
                        email: profile.emails[0].value,
                        artistName: profile.displayName ? profile.displayName : null,
                        createdAt: new Date(),
                        stripeId: createdStripeCustomer.id
                    });
                }
            }

            return done(null, user);
        } catch (error) {
            console.error('Authentication Error:', error);
            return done(error, null);
        }
    }
));


// Serialize user information for storing in the session
passport.serializeUser(function (user, done) {
    done(null, user.userId);
});

// Deserialize user information from the session
passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

