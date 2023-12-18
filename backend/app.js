import express from 'express';
const app = express();

app.use(express.json());



app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json("Something broke!");
})

app.listen(8080, () => {
    console.log("Listening on port 8080");
})