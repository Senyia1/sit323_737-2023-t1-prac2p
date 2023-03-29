const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 4000;

// configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure Passport.js
const JWTStrategy = passportJWT.Strategy;
const options = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_secret_key_here'
};

passport.use(new JWTStrategy(options, (jwtPayload, done) => {
  // find the user in the database if needed
  if (jwtPayload.sub === 'Senyia@example.com') {
    return done(null, true);
  } else {
    return done(null, false);
  }
}));

app.use(passport.initialize());

// define the routes
app.get('/', (req, res) => {
  res.send('Calculator Microservice');
});

app.post('/login', (req, res) => {
  // validate the user's credentials
  if (req.body.username === 'Senyia' && req.body.password === 'secret') {
    // generate a JWT token
    const token = jwt.sign({ sub: 'Senyia@example.com' }, 'your_secret_key_here');
    // return the token to the client
    res.json({ token: token });
  } else {
    // return an error response
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { num1, num2 } = req.body;
  const result = Number(num1) + Number(num2);
  res.json({ result: result });
});

app.post('/subtract', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { num1, num2 } = req.body;
  const result = Number(num1) - Number(num2);
  res.json({ result: result });
});

app.post('/multiply', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { num1, num2 } = req.body;
  const result = Number(num1) * Number(num2);
  res.json({ result: result });
});

app.post('/divide', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { num1, num2 } = req.body;
  if (Number(num2) === 0) {
    res.status(400).json({ error: 'Cannot divide by zero' });
  } else {
    const result = Number(num1) / Number(num2);
    res.json({ result: result });
  }
});

// start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
