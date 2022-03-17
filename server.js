// server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

// routes
const tasks = require("./routes/tasks");

// connect to the database
connectDB();

app.use(cors());
app.use(express.json());

// use routes
app.use("/api/tasks", tasks);

// setting up port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
