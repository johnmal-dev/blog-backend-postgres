require('express-async-errors');
const router = require('express').Router();

const { Blog } = require('../models');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

const blogFinder = async (req, res, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id);
    next();
  } catch (error) {
    next(error);
  }
};

router.get('/:id', blogFinder, async (req, res, next) => {
  try {
    if (req.blog) {
      res.json(req.blog);
    } else {
      res.status(404).send({ error: 'id not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', blogFinder, async (req, res, next) => {
  try {
    console.log('blog', req.blog);
    if (req.blog) {
      await req.blog.destroy();
      res.status(204).end();
    } else {
      res.status(404).send({ error: 'id not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    const body = req.body;
    await req.blog.update(body);
    await req.blog.save();
  }
  res.status(204).end();
});

module.exports = router;
