// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Import data
const comments = require('./comments.json');

// Set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up public folder
app.use(express.static('public'));

// Set up template engine
app.set('view engine', 'ejs');

// Render index.ejs
app.get('/', (req, res) => {
  res.render('index', { comments: comments });
});

// Render new.ejs
app.get('/new', (req, res) => {
  res.render('new');
});

// Create new comment
app.post('/new', (req, res) => {
  const newComment = {
    id: comments.length + 1,
    username: req.body.username,
    comment: req.body.comment
  };

  comments.push(newComment);
  res.redirect('/');
});

// Render edit.ejs
app.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  const comment = comments.find(comment => comment.id == id);
  res.render('edit', { comment: comment });
});

// Update comment
app.post('/:id/edit', (req, res) => {
  const id = req.params.id;
  const comment = comments.find(comment => comment.id == id);
  comment.username = req.body.username;
  comment.comment = req.body.comment;
  res.redirect('/');
});

// Delete comment
app.post('/:id/delete', (req, res) => {
  const id = req.params.id;
  const commentIndex = comments.findIndex(comment => comment.id == id);
  comments.splice(commentIndex, 1);
  res.redirect('/');
});

// Start web server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});