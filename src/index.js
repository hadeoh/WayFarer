import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.status(200).send({
  status: 200,
  message: 'Welcome To WayFarer, Transportation made easy.',
}));

// Handles


app.use((req, res, next) => {
  const error = new Error('Route Does not Exist');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: error.status || 500,
    success: false,
    error: error.name,
    message: error.message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
