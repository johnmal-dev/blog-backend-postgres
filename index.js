require('dotenv').config();
const { Sequelix, QueryTypes, Sequelize } = require('sequelize');
const express = require('express');
const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

app.get('/ping', async (req, res) => {
  res.send('pong');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established');
    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();
