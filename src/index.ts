import express from "express";
import { config } from "dotenv";

config();

const app = express();

app.get('/', (req, res) => {
  res.end("Hello world")
})

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Listening on port ${port}`))
