import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import routes from "./routes/api.mjs";
dotenv.config()
const app = express();
const PORT = process.env.PORT;

// Define middleware here
app.use(express.text());

// Sets client directory as static so the index file can reference other files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "/client")));

routes(app);

// Serves html file when root directory is hit
app.get("*", (req, res) => res.sendFile("/index.html"));

// Listens for provided port and runs server
app.listen(PORT, () => console.log(`🌎 ==> Server now on port ${PORT}!`));