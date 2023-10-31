// Create web server application
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const comments = require('./comments.json');
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

// http://localhost:4001/comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// http://localhost:4001/comments/1
app.get('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const comment = comments.find(comment => comment.id === id);
  res.json(comment);
});

// http://localhost:4001/comments
app.post('/comments', (req, res) => {
  const comment = req.body;
  comment.id = comments.length + 1;
  comments.push(comment);
  res.json(comment);
});

// http://localhost:4001/comments/1
app.put('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const comment = req.body;
  comments[id - 1] = comment;
  res.json(comment);
});

// http://localhost:4001/comments/1
app.delete('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const comment = comments[id - 1];
  comments.splice(id - 1, 1);
  res.json(comment);
});

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
