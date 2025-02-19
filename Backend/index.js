const express = require('express');
require('dotenv').config()
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000


// Middleware 
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send(`Server is running `);
})


app.listen(port, () => {
    console.log(`Server is running by port ${port}`);
})
    