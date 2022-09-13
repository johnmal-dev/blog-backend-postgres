require('express-async-errors');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const { User } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll();
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

// router.get('/', async (req, res) => {
//   const blogs = await Blog.findAll();
//   res.json(blogs);
// });

// const blogFinder = async (req, res, next) => {
//   req.blog = await Blog.findByPk(req.params.id);
//   next();
// };

// router.get('/:id', blogFinder, async (req, res) => {
//   if (req.blog) {
//     res.json(req.blog);
//   } else {
//     res.status(404).end();
//   }
// });

// router.delete('/:id', blogFinder, async (req, res) => {
//   await req.blog.destroy();
//   res.status(204).end();
// });

// router.put('/:id', blogFinder, async (req, res) => {
//   if (req.blog) {
//     const body = req.body;
//     await req.blog.update(body);
//     await req.blog.save();
//     res.status(201).end();
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;
