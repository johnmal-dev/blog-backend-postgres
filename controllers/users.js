require('express-async-errors');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const { User, Blog } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  });
  res.json(users);
});

router.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    username,
    name,
    passwordHash,
  });

  res.status(201).json(user);
});

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });
  console.log(user);
  user.username = req.body.updatedUsername;
  user.updatedAt = Date.now();
  await user.save();
  res.json(user);
});

module.exports = router;
