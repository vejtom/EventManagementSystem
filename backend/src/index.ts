import express from 'express';
import cors from "cors";

// Create an express app
const app = express();

// Setup CORS to allow requests from any origin
app.use(cors());

// Make express parse JSON bodies & URL encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// No route found
app.use((_req, res) => {
  res.status(404).send('404 Not Found');
});

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Backend Server is running on http://localhost:${port}`);
});
