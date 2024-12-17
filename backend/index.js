const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');

require('dotenv').config();
require('./Models/db');

const app = express();

app.use(bodyParser.json());
app.use(cors())

const PORT = process.env.PORT || 8080

app.get('/auth', AuthRouter)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);

})