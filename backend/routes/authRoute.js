import dotenv from 'dotenv';
dotenv.config();


import auth from '../middleware.js';
import express from 'express';
import passport from 'passport';

const authRouter = express.Router();

authRouter.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

authRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'], } // prompt: 'consent' 
    ));

authRouter.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/success',
        failureRedirect: '/google/failure'
    })
);

// Custom callback for successRedirect
authRouter.get('/success', (req, res) => {
    // Access req.user here and construct the final redirect URL
    const redirectURL = `http://localhost:3000/user/${req.user.userId}`;
    res.redirect(redirectURL);
});


authRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.send(`You have now been logged out.`);
});

authRouter.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});

// using this for SSR, to check with the server if we're still authenticated (got it in all the pages because they're SSR currently)
authRouter.get('/auth/status', (req, res) => {
    if (!req.user) {
        return res.status(401).send('Unauthorized');
    }
    return res.json({ userId: req.user.userId });
});


export default authRouter;