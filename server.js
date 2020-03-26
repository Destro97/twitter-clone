const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const dbConnection = require("./config/db");

const app = express();

// Connect Databse
dbConnection();

// Init Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API RESPONSE"));

// Define Routes
app.use("/api", require("./routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
