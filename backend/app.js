import express from 'express';
import './config/database.js';
import './config/passport.js';
import cors from 'cors';

import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import linkRouter from './routes/linkRoute.js';

const app = express();
app.use(express.json());
app.use(cors());



// my routes
app.use(authRouter);

app.use('/user', userRouter);

app.use('/link', linkRouter)

// server listening
app.listen(5000, () => {
    console.log("Listening on port 5000");
})