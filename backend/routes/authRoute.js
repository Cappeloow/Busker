import dotenv from 'dotenv';
dotenv.config();


import auth from '../middleware.js';
import express from 'express';
import session from 'express-session';
import passport from 'passport';

const authRouter = express.Router();

authRouter.use(session({ secret: process.env.GOOGLE_SECRET_KEY, resave: false, saveUninitialized: true }));
authRouter.use(passport.initialize());
authRouter.use(passport.session());
authRouter.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

authRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'], prompt: 'consent' }
    ));

authRouter.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/google/failure'
    })
);

authRouter.get('/protected', auth, (req, res) => {
    console.log(req.user);
    res.send(`Hello ${req.user.ArtistName}`);
});

authRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.send(`You have now been logged out.`);
});

authRouter.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});

export default authRouter;