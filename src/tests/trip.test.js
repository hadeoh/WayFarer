/* eslint-env mocha */
import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';

const { expect } = chai;

chai.use(chaiHttp);

describe('Tests for all trips Endpoints', () => {
  let adminToken;
  let userToken;
  let abc;
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'usthmandanfodio@gmail.com',
        password: 'modupeola',
      })
      .end((err, res) => {
        const { token } = res.body.data;
        adminToken = token;
        done(err);
      });
  });

  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'ojematthew@gmail.com',
        password: 'yh89uyightGH',
      })
      .end((err, res) => {
        const { token } = res.body.data;
        userToken = token;
        done(err);
      });
  });

  describe('POST api/v1/trips', () => {
    it('Should successfully create a trip', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          bus_id: 2,
          origin: 'Imo',
          destination: 'Awka',
          trip_date: '2018-09-09',
          fare: '5677',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.statuscode).to.be.equal(201);
          expect(res.body.data).to.have.keys(
            'id',
            'bus_id',
            'origin',
            'destination',
            'trip_date',
            'fare',
            'status',
          );
          done();
        });
    });
    it('Should return error when no token is supplied to create a trip', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${''}`)
        .send({
          bus_id: 2,
          origin: 'Imo',
          destination: 'Awka',
          trip_date: '2018-09-09',
          fare: '5677',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.statuscode).to.be.equal(401);
          expect(res.body.error).to.be.equal('JsonWebTokenError. jwt must be provided');
          expect(res.body).to.have.keys(
            'status',
            'statuscode',
            'error',
          );
          done();
        });
    });
    it('Should return error when a wrong token is supplied to create a trip', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${abc}`)
        .send({
          bus_id: 2,
          origin: 'Imo',
          destination: 'Awka',
          trip_date: '2018-09-09',
          fare: '5677',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.statuscode).to.be.equal(401);
          expect(res.body.error).to.be.equal('JsonWebTokenError. jwt malformed');
          expect(res.body).to.have.keys(
            'status',
            'statuscode',
            'error',
          );
          done();
        });
    });
    it('Should return error when the token to create a trip is not for an admin', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          bus_id: 2,
          origin: 'Imo',
          destination: 'Awka',
          trip_date: '2018-09-09',
          fare: '5677',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.statuscode).to.be.equal(401);
          expect(res.body.error).to.be.equal('Unauthorized action!');
          expect(res.body.message).to.be.equal('Only admins can perform this action');
          expect(res.body).to.have.keys(
            'status',
            'statuscode',
            'error',
            'message',
          );
          done();
        });
    });
    it('Should return an error if an admin tries to create a trip without a bus_id', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          bus_id: '',
          origin: 'Lagos',
          destination: 'Osun',
          trip_date: '2018-12-08',
          fare: '2000',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid bus_id provided');
          expect(res.body.message).to.be.equal('bus_id cannot be empty');
          done();
        });
    });
    it('Should return an error if an admin tries to create a trip without an origin', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          bus_id: 1,
          origin: '',
          destination: 'Osun',
          trip_date: '2018-12-08',
          fare: '2000',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid origin provided');
          expect(res.body.message).to.be.equal('origin cannot be empty');
          done();
        });
    });
    it('Should return an error if an admin tries to create a trip without a destination', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          bus_id: 1,
          origin: 'Lagos',
          destination: '',
          trip_date: '2018-12-08',
          fare: '2000',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid destination provided');
          expect(res.body.message).to.be.equal('destination cannot be empty');
          done();
        });
    });
    it('Should return an error if an admin tries to create a trip without a trip_date', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          bus_id: 1,
          origin: 'Lagos',
          destination: 'Osun',
          trip_date: '',
          fare: '2000',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid trip_date provided');
          expect(res.body.message).to.be.equal('trip_date cannot be empty');
          done();
        });
    });
    it('Should return an error if an admin tries to create a trip without a fare', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          bus_id: '1',
          origin: 'Lagos',
          destination: 'Osun',
          trip_date: '2018-12-08',
          fare: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid fare provided');
          expect(res.body.message).to.be.equal('fare cannot be empty');
          done();
        });
    });
    it('Should return an error if a user tries to create a trip with a non-numeric fare', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          bus_id: 1,
          origin: 'Lagos',
          destination: 'Osun',
          trip_date: '2018-12-08',
          fare: 'xxx',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid fare provided');
          expect(res.body.message).to.be.equal('fare must contain only numbers');
          done();
        });
    });
    it('Should return an error if an admin tries to create a trip with an unavailable bus', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          bus_id: 3,
          origin: 'Lagos',
          destination: 'Osun',
          trip_date: '2018-12-08',
          fare: '2000',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('The bus picked is not available');
          expect(res.body.message).to.be.equal('Please pick another bus that is available');
          done();
        });
    });
  });

  describe('GET api/v1/trips', () => {
    it('Should successfully get trips', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.statuscode).to.be.equal(200);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.data[0]).to.have.keys(
            'trip_id',
            'bus_id',
            'origin',
            'destination',
            'trip_date',
            'fare',
            'status',
          );
          done();
        });
    });
    it('Should return error when no token is supplied to get trips', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips')
        .set('Authorization', `Bearer ${''}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.statuscode).to.be.equal(401);
          expect(res.body.error).to.be.equal('JsonWebTokenError. jwt must be provided');
          expect(res.body).to.have.keys(
            'status',
            'statuscode',
            'error',
          );
          done();
        });
    });
    it('Should return error when a wrong token is supplied to get trips', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips')
        .set('Authorization', `Bearer ${abc}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.statuscode).to.be.equal(401);
          expect(res.body.error).to.be.equal('JsonWebTokenError. jwt malformed');
          expect(res.body).to.have.keys(
            'status',
            'statuscode',
            'error',
          );
          done();
        });
    });
    it('Should successfully get all trips', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.statuscode).to.be.equal(200);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.data[0]).to.have.keys(
            'trip_id',
            'bus_id',
            'origin',
            'destination',
            'trip_date',
            'fare',
            'status',
          );
          done();
        });
    });
  });

  describe('GET api/v1/trips/:destination', () => {
    it('Should successfully get trips based on destination', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/Oyo')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.statuscode).to.be.equal(200);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.data[0]).to.have.keys(
            'id',
            'bus_id',
            'origin',
            'destination',
            'trip_date',
            'fare',
            'status',
          );
          done();
        });
    });
    it('Should return error when no token is supplied to get trips', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/Oyo')
        .set('Authorization', `Bearer ${''}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.statuscode).to.be.equal(401);
          expect(res.body.error).to.be.equal('JsonWebTokenError. jwt must be provided');
          expect(res.body).to.have.keys(
            'status',
            'statuscode',
            'error',
          );
          done();
        });
    });
    it('Should return error when a wrong token is supplied to get trips', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/Oyo')
        .set('Authorization', `Bearer ${abc}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.statuscode).to.be.equal(401);
          expect(res.body.error).to.be.equal('JsonWebTokenError. jwt malformed');
          expect(res.body).to.have.keys(
            'status',
            'statuscode',
            'error',
          );
          done();
        });
    });
    it('Should restrict admin to get all trips based on destination', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/Oyo')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.statuscode).to.be.equal(401);
          expect(res.body.status).to.be.equal('error');
          expect(res.body).to.have.keys(
            'status',
            'statuscode',
            'error',
            'message',
          );
          done();
        });
    });
    it('Should return error when there is no trip based on destination', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/sabo')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.statuscode).to.be.equal(404);
          expect(res.body.error).to.be.equal('Not found');
          expect(res.body.message).to.be.equal('There is no trip available');
          expect(res.body).to.have.keys(
            'status',
            'statuscode',
            'error',
            'message',
          );
          done();
        });
    });
  });

  describe('PATCH api/v1/trips/:tripId', () => {
    it('Should successfully cancel a trip', (done) => {
      chai
        .request(app)
        .patch('/api/v1/trips/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(202);
          expect(res.body.statuscode).to.be.equal(202);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.data).to.have.keys('message');
          expect(res.body.data.message).to.be.equal('Trip cancelled successfully');
          done();
        });
    });
    it('Should return error when no token is supplied to cancel a trip', (done) => {
      chai
        .request(app)
        .patch('/api/v1/trips/1')
        .set('Authorization', `Bearer ${''}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.statuscode).to.be.equal(401);
          expect(res.body.error).to.be.equal('JsonWebTokenError. jwt must be provided');
          expect(res.body).to.have.keys(
            'status',
            'statuscode',
            'error',
          );
          done();
        });
    });
    it('Should return error when a wrong token is supplied to cancel a trip', (done) => {
      chai
        .request(app)
        .patch('/api/v1/trips/1')
        .set('Authorization', `Bearer ${abc}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.statuscode).to.be.equal(401);
          expect(res.body.error).to.be.equal('JsonWebTokenError. jwt malformed');
          expect(res.body).to.have.keys(
            'status',
            'statuscode',
            'error',
          );
          done();
        });
    });
    it('Should return error when a user tries to cancel a trip', (done) => {
      chai
        .request(app)
        .patch('/api/v1/trips/1')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.statuscode).to.be.equal(401);
          expect(res.body.error).to.be.equal('Unauthorized action!');
          expect(res.body.message).to.be.equal('Only admins can perform this action');
          expect(res.body).to.have.keys(
            'status',
            'statuscode',
            'error',
            'message',
          );
          done();
        });
    });
    it('Should return error if a trip has already been cancelled', (done) => {
      chai
        .request(app)
        .patch('/api/v1/trips/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.statuscode).to.be.equal(409);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.message).to.be.equal('This trip has been cancelled already');
          expect(res.body).to.have.keys(
            'error',
            'status',
            'statuscode',
            'message',
          );
          done();
        });
    });
    it('Should return error if a trip that does not exist is to be cancelled', (done) => {
      chai
        .request(app)
        .patch('/api/v1/trips/11')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.statuscode).to.be.equal(404);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.error).to.be.equal('Not Found');
          expect(res.body.message).to.be.equal('Trip does not exist');
          expect(res.body).to.have.keys(
            'error',
            'status',
            'statuscode',
            'message',
          );
          done();
        });
    });
  });
});
