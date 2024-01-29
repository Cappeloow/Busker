import express from 'express';
import './config/database.js';
import './config/passport.js';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';

// all imported routes 
import productRouter from './routes/productRoute.js'
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import linkRouter from './routes/linkRoute.js';
import orderRouter from './routes/orderRoute.js';
import availabilityRouter from './routes/availabilityRoute.js';





const app = express();
app.use(express.json());
// using credentials:true to get access to the cookie from the client that was sent from google auth
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(session({ secret: process.env.GOOGLE_SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// using all my routes
app.use(authRouter);
app.use('/user', userRouter);
app.use('/product', productRouter)
app.use('/link', linkRouter)
app.use('/order', orderRouter);
app.use('/availability', availabilityRouter);
// server listening
app.listen(5000, () => {
    console.log("Listening on port 5000");
})