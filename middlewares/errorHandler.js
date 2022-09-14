const errorHandler = (error, req, res, next) => {
  console.error('Error Handler:', error.message);
  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).send({ error: error.message });
  }
  if (error.name === 'TypeError') {
    return res.status(400).send({ error: 'null not found' });
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).send({ error: 'request outside of constraint' });
  }
  next(error);
};

module.exports = errorHandler;
