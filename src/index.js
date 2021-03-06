import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import busRoutes from './routes/bus';
import tripRoutes from './routes/trip';
import bookingRoutes from './routes/booking';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.status(200).send({
  status: 200,
  message: 'Welcome To WayFarer, Transportation made easy.',
}));

app.get('/documentation', (req, res) => {
  return res.redirect('https://app.swaggerhub.com/apis/hadeoh/wayfarer/1.0');
});

// Handles
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/buses', busRoutes);
app.use('/api/v1/trips', tripRoutes);
app.use('/api/v1/bookings', bookingRoutes);

app.use((req, res, next) => {
  const error = new Error('Route Does not Exist');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: 'error',
    statuscode: error.status || 500,
    error: error.name,
    message: error.message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
