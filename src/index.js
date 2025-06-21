
import express from 'express';
import dotenv from 'dotenv';
import routes from "./routes/routes.js"
import logger from './middleware/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.use(routes);

app.get('/', (req, res) => {
  res.send('Backend with JWT and PostgreSQL');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
