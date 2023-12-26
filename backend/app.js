import express from 'express';
import './config/database.js';
import './config/passport.js';
import authRouter from './routes/authRoute.js';
const app = express();


app.use(authRouter);

app.listen(5000, () => {
    console.log("Listening on port 5000");
})