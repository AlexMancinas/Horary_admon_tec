require('dotenv').config();
const getConnection = require('./database/connection')
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

//invoking the routes

app.use('/api/v1', require('./routes'));
getConnection();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});