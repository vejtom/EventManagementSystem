import express from 'express';
import cors from 'cors';
import { eventRouter } from './events/router';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

// Create an express app
const app = express();

// Setup CORS to allow requests from any origin
app.use(cors());

// Make express parse JSON bodies & URL encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the API documentation
const swaggerDocument = YAML.load(path.resolve(__dirname, '../api-documentation/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// custom routes
app.use('/events', eventRouter);

// No route found
app.use((_req, res) => {
  res.status(404).send('404 Not Found');
});

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Backend Server is running on http://localhost:${port}`);
});
