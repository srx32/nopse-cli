import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();

// Uncomment to enable CORS (In case of a CORS error)
// app.use(cors());

// Logging middleware
app.use(morgan("combined"));

app.use(express.json());

export default app;
