require('express-async-errors');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { SECRET } = require('../util/config');
const { Blog, User } = require('../models');
const { Op } = require('sequelize');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      res.status(401).json({ error: 'token invalid' });
    }
  } else {
    res.status(401).json({ error: 'token missing' });
  }
  next();
};

router.get('/', async (req, res) => {
  const where = {};

  if (req.query.search) {
    where.title = {
      [Op.iLike]: `%${req.query.search}%`,
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
  });
  res.json(blogs);
});

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    date: new Date(),
    userId: user.id,
  });
  res.json(blog);
});

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!(user && req.blog)) res.status(400).end();
  if (user.id !== req.blog.userId) res.status(401).end();
  await req.blog.destroy();
  res.status(204).end();
});

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    const body = req.body;
    await req.blog.update(body);
    await req.blog.save();
    res.status(201).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
