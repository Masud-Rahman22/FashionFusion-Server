const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose')
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aw2xu1p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('could not connect to MongoDB', err))


app.get('/', (req, res) => {
    res.send('Project is running properly')
})

app.listen(port, () => {
    console.log(`Project is running properly on port ${port}`);
})