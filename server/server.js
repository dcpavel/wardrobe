const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { PORT } = require('./envVars');

const app = express();

// require routers
const userRouter = require('./routes/userRouter');
const wardrobeRouter = require('./routes/wardrobeRouter');
const clothingRouter = require('./routes/clothingRouter');
const clothingTypeRouter = require('./routes/clothingTypeRouter');

// automatically parse json and cookies
app.use(express.json());
app.use(cookieParser());

// handle requests for static files
app.use(
  express.static(path.resolve(__dirname, '../client'))
);

// route handlers
// home
app.get('/',
  (_, res) => {
    res
      .status(200)
      .json(res.locals);
  }
);

// database
app.use('/users', userRouter);
app.use('/wardrobe', wardrobeRouter);
app.use('/clothes', clothingRouter);
app.use('/clotheType', clothingTypeRouter);

// catch-all for unknown routes
app.use((_, res) => {
  res
    .status(404)
    .send('This page does not exist')
});

// global error handler
app.use((err, _, res, _2) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start the server
app.listen(
  PORT,
  () => { console.log(`Listening on port ${PORT}...`) }
);

module.exports = app;