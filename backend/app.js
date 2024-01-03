import express from 'express';
import './config/database.js';
import './config/passport.js';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';


import productRouter from './routes/productRoute.js'
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import linkRouter from './routes/linkRoute.js';
import checkoutRouter from './routes/checkoutRoute.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(session({ secret: process.env.GOOGLE_SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// my routes
app.use(authRouter);
app.use('/test', (req, res, next) => {
    console.log('Session:', req.session);
    console.log('User:', req.user);

    if (req.isAuthenticated()) {
        res.send(`Hello ${req.user.ArtistName || 'Guest'}`);
    } else {
        console.log('User not authenticated. Redirecting to /login.');
        res.redirect('/');
    }
});
app.use('/user', userRouter);
app.use('/product', productRouter)
app.use('/link', linkRouter)
app.use('/checkout', checkoutRouter);
// server listening
app.listen(5000, () => {
    console.log("Listening on port 5000");
})