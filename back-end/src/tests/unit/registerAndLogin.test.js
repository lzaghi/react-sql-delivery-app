const chai = require("chai")
const chaiHttp = require("chai-http")
const Sinon = require("sinon");
const { User } = require('../../database/models');
const crypto = require('crypto');
const app = require("../../api/app");

chai.use(chaiHttp)
const { expect } = chai;

describe('Testing register and login', () => {
  describe('POST /register', () => {
    it('returns status 400 when no name provided', async () => {
      Sinon.stub(User, 'findOne').rejects()
      Sinon.stub(User, 'create').resolves()
      
      const chaiHttpResponse = await chai
        .request(app)
        .post('/register')
        .send({
          // name: 'Teste Testando',
          email: 'teste@teste.com',
          password: '123456'
        })

        expect(chaiHttpResponse.status).to.be.equal(400)
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
    })
    it('returns status 400 when no email provided', async () => {
      Sinon.stub(User, 'findOne').rejects()
      Sinon.stub(User, 'create').resolves()
      
      const chaiHttpResponse = await chai
        .request(app)
        .post('/register')
        .send({
          name: 'Teste Testando',
          // email: 'teste@teste.com',
          password: '123456'
        })

        expect(chaiHttpResponse.status).to.be.equal(400)
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
    })
    it('returns status 400 when no password provided', async () => {
      Sinon.stub(User, 'findOne').rejects()
      Sinon.stub(User, 'create').resolves()
      
      const chaiHttpResponse = await chai
        .request(app)
        .post('/register')
        .send({
          name: 'Teste Testando',
          email: 'teste@teste.com',
          // password: '123456'
        })

        expect(chaiHttpResponse.status).to.be.equal(400)
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
    })
    it('returns status 401 when name is invalid', async () => {
      Sinon.stub(User, 'findOne').rejects()
      Sinon.stub(User, 'create').resolves()
      
      const chaiHttpResponse = await chai
        .request(app)
        .post('/register')
        .send({
          name: 'Teste',
          email: 'teste@teste.com',
          password: '123456'
        })

        expect(chaiHttpResponse.status).to.be.equal(401)
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Invalid name' })
    })
    it('returns status 401 when email is invalid', async () => {
      Sinon.stub(User, 'findOne').rejects()
      Sinon.stub(User, 'create').resolves()
      
      const chaiHttpResponse = await chai
        .request(app)
        .post('/register')
        .send({
          name: 'Teste Testando',
          email: 'teste@teste',
          password: '123456'
        })

        expect(chaiHttpResponse.status).to.be.equal(401)
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Invalid email' })
    })
    it('returns status 401 when password is invalid', async () => {
      Sinon.stub(User, 'findOne').rejects()
      Sinon.stub(User, 'create').resolves()
      
      const chaiHttpResponse = await chai
        .request(app)
        .post('/register')
        .send({
          name: 'Teste Testando',
          email: 'teste@teste.com',
          password: '1234'
        })

        expect(chaiHttpResponse.status).to.be.equal(401)
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Invalid password' })
    })
    it('returns status 409 when email is already used', async () => {
      Sinon.stub(User, 'findOne').resolves(true)
      Sinon.stub(User, 'create').resolves()
      
      const chaiHttpResponse = await chai
        .request(app)
        .post('/register')
        .send({
          name: 'Teste Testando',
          email: 'teste@teste.com',
          password: '123456'
        })

        expect(chaiHttpResponse.status).to.be.equal(409)
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Email already registered!' })
    })
    it('returns status 201 when success', async () => {
      Sinon.stub(User, 'findOne').resolves(false)
      Sinon.stub(User, 'create').resolves({
          dataValues: {id: 10,
          name: 'Teste Testando',
          email: 'teste@teste.com',
          password: '123456'}
        })
      
      const chaiHttpResponse = await chai
        .request(app)
        .post('/register')
        .send({
          name: 'Teste Testando',
          email: 'teste@teste.com',
          password: '123456'
        })

        expect(chaiHttpResponse.status).to.be.equal(201)
    })
  })

  describe('POST /login', () => {
    it('returns status 404 when invalid email', async () => {
      Sinon.stub(User, 'findOne').resolves(false)
      
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'teste@teste.com',
          password: '123456'
        })

        expect(chaiHttpResponse.status).to.be.equal(404)
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Email not registered!' })
    })
    it('returns status 401 when invalid password', async () => {
      const hashed123456 = 'e10adc3949ba59abbe56e057f20f883e';
      Sinon.stub(User, 'findOne').resolves({
          email: 'teste@teste.com',
          password: hashed123456,
          dataValues: {
            email: 'teste@teste.com',
            password: hashed123456,
          }
        })
      
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'teste@teste.com',
          password: '1234567'
        })

        expect(chaiHttpResponse.status).to.be.equal(401)
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Wrong password!' })
    })
    it('returns status 200 when success', async () => {
      const hashed123456 = 'e10adc3949ba59abbe56e057f20f883e';
      Sinon.stub(User, 'findOne').resolves({
          email: 'teste@teste.com',
          password: hashed123456,
          dataValues: {
            email: 'teste@teste.com',
            password: hashed123456,
          }
        })
      
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'teste@teste.com',
          password: '123456'
        })

        expect(chaiHttpResponse.status).to.be.equal(200)
    })
  })

  afterEach(() => {
    Sinon.restore();
  });
})