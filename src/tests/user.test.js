/* eslint-env mocha */
import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';

const { expect } = chai;

chai.use(chaiHttp);

describe('Tests for all Auth(signup and signin) Endpoints', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'franchesqa@gmail.com',
        password: 'yh89uyightGH',
      })
      .end((err, res) => {
        const { token } = res.body.data;
        done(err);
      });
  });
  describe('POST api/v1/auth/signup', () => {
    it('Should successfully sign up a user and return a token', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          first_name: 'ifeoluwa',
          last_name: 'matthew',
          email: 'ife12@gmail.com',
          password: 'yh89uyightGH',
          confirm_password: 'yh89uyightGH',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.statuscode).to.be.equal(201);
          expect(res.body.data).to.have.keys(
            'token',
            'user_id',
            'email',
            'first_name',
            'last_name',
            'is_admin',
          );
          expect(res.body.data.token).to.be.a('string');
          done();
        });
    });
    it('Should return an error if a user tries to sign up without a first_name', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          first_name: '',
          last_name: 'bellion',
          email: 'jon@gmail.com',
          password: 'simpleandweet',
          type: 'staff',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid first_name provided');
          expect(res.body.message).to.be.equal('first_name cannot be empty');
          done();
        });
    });
    it('Should return an error if a user tries to sign up without a last_name', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          first_name: 'jon',
          last_name: '',
          email: 'jon@gmail.com',
          password: 'simpleandweet',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid last_name provided');
          expect(res.body.message).to.be.equal('last_name cannot be empty');
          done();
        });
    });
    it('Should return an error if a user tries to sign up without an email address', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          first_name: 'jon',
          last_name: 'bellion',
          email: '',
          password: 'simpleandweet',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid email provided');
          expect(res.body.message).to.be.equal('email cannot be empty');
          done();
        });
    });
    it('Should return an error if a user tries to sign up without a password', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          first_name: 'jon',
          last_name: 'bellion',
          email: 'jon@gmail.com',
          password: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid password provided');
          expect(res.body.message).to.be.equal('password cannot be empty');
          done();
        });
    });
    it('Should return an error if a user tries to sign up with a password less than 6 characters', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          first_name: 'jon',
          last_name: 'bellion',
          email: 'jon@gmail.com',
          password: 'simpl',
          confirm_password: 'simpl',
        })
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body.statuscode).to.be.equal(406);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid password provided');
          expect(res.body.message).to.be.equal('Password must not be less than six(6) characters');
          done();
        });
    });
    it('Should return an error if a user tries to sign up with a non-alpabetic first_name', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          first_name: '..',
          last_name: 'bellion',
          email: 'jon@gmail.com',
          password: 'simpleandweet',
          confirm_password: 'simpleandweet',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid first_name provided');
          expect(res.body.message).to.be.equal('first_name must contain only alphabets');
          done();
        });
    });
    it('Should return an error if a user tries to sign up with a non-alpabetic last_name', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          first_name: 'jon',
          last_name: '.@',
          email: 'jon@gmail.com',
          password: 'simpleandweet',
          confirm_password: 'simpleandweet',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid last_name provided');
          expect(res.body.message).to.be.equal('last_name must contain only alphabets');
          done();
        });
    });

    it('Should return an error if a user tries to sign up with an invalid email address', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          first_name: 'jon',
          last_name: 'bellion',
          email: 'jongmail.com',
          password: 'simpleandweet',
          confirm_password: 'simpleandweet',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid email address');
          expect(res.body.message).to.be.equal('Please provide a valid email address');
          done();
        });
    });
    it('Should return an error if a user tries to sign up with a taken email address', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          first_name: 'jon',
          last_name: 'bellion',
          email: 'ojematthew@gmail.com',
          password: 'simpleandweet',
          confirm_password: 'simpleandweet',
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.statuscode).to.be.equal(409);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.error).to.be.equal('Email already in use');
          expect(res.body.message).to.be.equal('Please provide another email address');
          done();
        });
    });
  });
  describe('POST api/v1/auth/signin', () => {
    it('should login a registered user and return a token if valid credentials are provided', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'ojematthew@gmail.com',
          password: 'yh89uyightGH',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.statuscode).to.be.equal(200);
          expect(res.body).to.have.keys('status', 'statuscode', 'data', 'message');
          expect(res.body.data).to.have.key(
            'token',
            'user_id',
            'first_name',
            'last_name',
            'email',
            'is_admin',
          );
          done();
        });
    });
    it('Should return an error if a registered user tries to log in with wrong credentials', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'ojematthew@gmail.com',
          password: 'complexandbitter',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.statuscode).to.be.equal(401);
          expect(res.body).to.have.keys('status', 'statuscode', 'error');
          expect(res.body.error).to.be.equal(
            'Authentication Failed. Invalid Login credentials provided',
          );
          done();
        });
    });
    it('Should return an error if a user tries to log in with a non existing account', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'jondoe@gmail.com',
          password: 'simpleandsweet',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.statuscode).to.be.equal(401);
          expect(res.body).to.have.keys('status', 'statuscode', 'error');
          expect(res.body.error).to.be.equal(
            'This email is not registered here',
          );
          done();
        });
    });
    it('Should return an error if a user tries to log in without providing an email address', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: '',
          password: 'simpleandweet',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.message).to.be.equal('email cannot be empty');
          done();
        });
    });
    it('Should return an error if a user tries to log in without providing a password', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'jon@gmail.com',
          password: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.statuscode).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'statuscode', 'error', 'message');
          expect(res.body.message).to.be.equal('password cannot be empty');
          done();
        });
    });
  });
});
