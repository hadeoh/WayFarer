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

  describe('POST api/v1/bookings', () => {
    it('Should successfully create a booking', (done) => {
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          trip_id: 3,
          seat_number: 4,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.statuscode).to.be.equal(201);
          expect(res.body.data).to.have.keys(
            'trip_id',
            'bus_id',
            'trip_date',
            'first_name',
            'last_name',
            'email',
            'user_id',
            'seat_number',
            'created_on',
            'booking_id',
          );
          done();
        });
    });
    it('Should return error when no token is supplied to create a booking', (done) => {
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${''}`)
        .send({
          trip_id: 3,
          seat_number: 4,
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
    it('Should return error when a wrong token is supplied to create a booking', (done) => {
      chai
        .request(app)
        .post('/api/v1/bookings')
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
    it('Should return error when the token to create a booking is not for a user', (done) => {
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          trip_id: 3,
          seat_number: 4,
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.statuscode).to.be.equal(401);
          expect(res.body.error).to.be.equal('Unauthorized action!');
          expect(res.body.message).to.be.equal('Only users can perform this action');
          expect(res.body).to.have.keys(
            'status',
            'statuscode',
            'error',
            'message',
          );
          done();
        });
    });
    it('Should return an error if a user tries to create a booking without a trip_id', (done) => {
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          trip_id: '',
          seat_number: 4,
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid trip_id provided');
          expect(res.body.message).to.be.equal('trip_id cannot be empty');
          done();
        });
    });
    it('Should return an error if a user tries to create a trip without a seat number', (done) => {
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          trip_id: 3,
          seat_number: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid seat_number provided');
          expect(res.body.message).to.be.equal('seat_number cannot be empty');
          done();
        });
    });
    it('Should return an error if a user tries to create a trip with a non-numeric trip_id', (done) => {
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          trip_id: 'xxx',
          seat_number: 4,
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid trip_id provided');
          expect(res.body.message).to.be.equal('trip_id must contain only numbers');
          done();
        });
    });
    it('Should return an error if a user tries to create a trip with a non-numeric seat_nnumber', (done) => {
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          trip_id: 3,
          seat_number: 'xxx',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid seat_number provided');
          expect(res.body.message).to.be.equal('seat_number must contain only numbers');
          done();
        });
    });
  });

//   describe('POST api/v1/trips', () => {
//     it('Should successfully get trips', (done) => {
//       chai
//         .request(app)
//         .get('/api/v1/trips')
//         .set('Authorization', `Bearer ${adminToken}`)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body.statuscode).to.be.equal(200);
//           expect(res.body.status).to.be.equal('success');
//           expect(res.body.data[0]).to.have.keys(
//             'trip_id',
//             'bus_id',
//             'origin',
//             'destination',
//             'trip_date',
//             'fare',
//             'status',
//           );
//           done();
//         });
//     });
//     it('Should return error when no token is supplied to get trips', (done) => {
//       chai
//         .request(app)
//         .get('/api/v1/trips')
//         .set('Authorization', `Bearer ${''}`)
//         .end((err, res) => {
//           expect(res).to.have.status(401);
//           expect(res.body.statuscode).to.be.equal(401);
//           expect(res.body.error).to.be.equal('JsonWebTokenError. jwt must be provided');
//           expect(res.body).to.have.keys(
//             'status',
//             'statuscode',
//             'error',
//           );
//           done();
//         });
//     });
//     it('Should return error when a wrong token is supplied to get trips', (done) => {
//       chai
//         .request(app)
//         .get('/api/v1/trips')
//         .set('Authorization', `Bearer ${abc}`)
//         .end((err, res) => {
//           expect(res).to.have.status(401);
//           expect(res.body.statuscode).to.be.equal(401);
//           expect(res.body.error).to.be.equal('JsonWebTokenError. jwt malformed');
//           expect(res.body).to.have.keys(
//             'status',
//             'statuscode',
//             'error',
//           );
//           done();
//         });
//     });
//     it('Should successfully get all trips', (done) => {
//       chai
//         .request(app)
//         .get('/api/v1/trips')
//         .set('Authorization', `Bearer ${userToken}`)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body.statuscode).to.be.equal(200);
//           expect(res.body.status).to.be.equal('success');
//           expect(res.body.data[0]).to.have.keys(
//             'trip_id',
//             'bus_id',
//             'origin',
//             'destination',
//             'trip_date',
//             'fare',
//             'status',
//           );
//           done();
//         });
//     });
//   });
});
