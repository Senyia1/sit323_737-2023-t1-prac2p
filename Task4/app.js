const express = require('express');
const app = express();
const port = 3000;

// Body parsing middleware
app.use(express.json());

// Addition endpoint
app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send({ error: 'Invalid input parameters' });
    return;
  }
  const result = num1 + num2;
  res.send({ result });
});

// Subtraction endpoint
app.post('/subtract', (req, res) => {
  const { num1, num2 } = req.body;
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send({ error: 'Invalid input parameters' });
    return;
  }
  const result = num1 - num2;
  res.send({ result });
});

// Multiplication endpoint
app.post('/multiply', (req, res) => {
  const { num1, num2 } = req.body;
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send({ error: 'Invalid input parameters' });
    return;
  }
  const result = num1 * num2;
  res.send({ result });
});

// Division endpoint
app.post('/divide', (req, res) => {
  const { num1, num2 } = req.body;
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send({ error: 'Invalid input parameters' });
    return;
  }
  if (num2 === 0) {
    res.status(400).send({ error: 'Cannot divide by zero' });
    return;
  }
  const result = num1 / num2;
  res.send({ result });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Calculator microservice listening at http://localhost:${port}`);
});

