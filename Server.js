const express = require("express");
const cors = require("cors"); // CORS ko import karein

const app = express();

require('dotenv').config();

const dbConfig = require("./config/dbConfig");

// Use CORS middleware
app.use(cors());

// Destructure the JSON
app.use(express.json());

const userRoute = require("./routes/userRoute");

// Define routes
app.use('/api/user', userRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node server started at port ${port}`));
