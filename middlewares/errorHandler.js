const errorHandler = (error, req, res, next) => {
  console.error('error message:', error.message);
  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  next(error);
};

module.exports = errorHandler;
