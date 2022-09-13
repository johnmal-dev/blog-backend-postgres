const express = require('express');
const app = express();

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const errorHandler = require('./middlewares/errorHandler');

const blogsRouter = require('./controllers/blogs');

app.use(express.json());

app.use('/api/blogs', blogsRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

start();
