const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const urlRoutes = require('./routes/urlRoutes');
const cors = require('cors'); 

const app = express();
const PORT = 3000;

connectDB();

app.use(bodyParser.json());


app.use(cors());


app.use('/', urlRoutes);

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});
