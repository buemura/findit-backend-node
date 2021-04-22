require("dotenv").config();
import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3333;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use(require("./src/routes"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
