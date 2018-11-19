import express from 'express';
import db from './db/db';
// Set up the express app
const app = express();
// Add headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });
app.get('/api/list', (req, res) => {
    console.log("Request /api/list")
    res.status(200).send({
        success: 'true',
        data: db
    })
});
const PORT = 9938;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});