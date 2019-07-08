/* eslint-env mocha */
import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';

const { expect } = chai;

chai.use(chaiHttp);

describe('Tests for all buses Endpoints', () => {
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

  describe('POST api/v1/buses', () => {
    it('Should successfully create a bus', (done) => {
      chai
        .request(app)
        .post('/api/v1/buses')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          number_plate: '1334',
          manufacturer: 'Chevron',
          model: 'Speedy',
          year: '2018',
          capacity: 200,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.statuscode).to.be.equal(201);
          expect(res.body.data).to.have.keys(
            'bus_id',
            'number_plate',
            'manufacturer',
            'model',
            'year',
            'capacity',
            'status',
          );
          done();
        });
    });
    it('Should return error when no token is supplied to create a bus', (done) => {
      chai
        .request(app)
        .post('/api/v1/buses')
        .set('Authorization', `Bearer ${''}`)
        .send({
          number_plate: '1334',
          manufacturer: 'Chevron',
          model: 'Speedy',
          year: '2018',
          capacity: 200,
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
    it('Should return error when a wrong token is supplied to create a bus', (done) => {
      chai
        .request(app)
        .post('/api/v1/buses')
        .set('Authorization', `Bearer ${abc}`)
        .send({
          number_plate: '1334',
          manufacturer: 'Chevron',
          model: 'Speedy',
          year: '2018',
          capacity: 200,
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
    it('Should return error when the token to create a bus is not for an admin', (done) => {
      chai
        .request(app)
        .post('/api/v1/buses')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          number_plate: '1334',
          manufacturer: 'Chevron',
          model: 'Speedy',
          year: '2018',
          capacity: 200,
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
    it('Should return an error if an admin tries to create a bus without a number_plate', (done) => {
      chai
        .request(app)
        .post('/api/v1/buses')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          number_plate: '',
          manufacturer: 'Toyota',
          model: 'camry',
          year: '2018',
          capacity: 200,
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid number_plate provided');
          expect(res.body.message).to.be.equal('number_plate cannot be empty');
          done();
        });
    });
    it('Should return an error if an admin tries to create a bus without a manufacturer', (done) => {
      chai
        .request(app)
        .post('/api/v1/buses')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          number_plate: '12',
          manufacturer: '',
          model: 'camry',
          year: '2018',
          capacity: 200,
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid manufacturer provided');
          expect(res.body.message).to.be.equal('manufacturer cannot be empty');
          done();
        });
    });
    it('Should return an error if an admin tries to create a bus without a model', (done) => {
      chai
        .request(app)
        .post('/api/v1/buses')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          number_plate: '13',
          manufacturer: 'honda',
          model: '',
          year: '2018',
          capacity: 200,
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid model provided');
          expect(res.body.message).to.be.equal('model cannot be empty');
          done();
        });
    });
    it('Should return an error if an admin tries to create a bus without a year', (done) => {
      chai
        .request(app)
        .post('/api/v1/buses')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          number_plate: '13',
          manufacturer: 'honda',
          model: 'accord',
          year: '',
          capacity: 200,
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid year provided');
          expect(res.body.message).to.be.equal('year cannot be empty');
          done();
        });
    });
    it('Should return an error if an admin tries to create a bus without a capacity', (done) => {
      chai
        .request(app)
        .post('/api/v1/buses')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          number_plate: '13',
          manufacturer: 'honda',
          model: 'accord',
          year: '1876',
          capacity: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid capacity provided');
          expect(res.body.message).to.be.equal('capacity cannot be empty');
          done();
        });
    });
    it('Should return an error if a user tries to sign up with a non-numeric capacity', (done) => {
      chai
        .request(app)
        .post('/api/v1/buses')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          number_plate: '14',
          manufacturer: 'honda',
          model: 'accord',
          year: '1876',
          capacity: 'xxx',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid capacity provided');
          expect(res.body.message).to.be.equal('capacity must contain only numbers');
          done();
        });
    });
  });
});
