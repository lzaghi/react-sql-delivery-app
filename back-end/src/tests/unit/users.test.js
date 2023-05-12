const chai = require("chai")
const chaiHttp = require("chai-http")
const Sinon = require("sinon");
const { User } = require('../../database/models');
const jwt = require('jsonwebtoken');
const app = require("../../api/app");

chai.use(chaiHttp)
const { expect } = chai;

describe('Testing users', () => {
  describe('GET /users/:role', () => {
    it('returns status 200 when success', async () => {
      Sinon.stub(jwt, 'verify').callsFake(() => true);
      Sinon.stub(User, 'findAll').resolves()

      const token = 'my-auth-token'
      const chaiHttpResponse = await chai
        .request(app)
        .get('/users/:role')
        .set('Authorization', `Bearer ${token}`)

      expect(chaiHttpResponse.status).to.be.equal(200)
    })
  })
  describe('GET /users', () => {
    it('returns status 200 when success', async () => {
      Sinon.stub(jwt, 'verify').callsFake(() => true);
      Sinon.stub(User, 'findAll').resolves()

      const token = 'my-auth-token'
      const chaiHttpResponse = await chai
        .request(app)
        .get('/users/')
        .set('Authorization', `Bearer ${token}`)

      expect(chaiHttpResponse.status).to.be.equal(200)
    })
  })
  describe('DELETE /users/delete', () => {
    it('returns status 204 when success', async () => {
      Sinon.stub(jwt, 'verify').callsFake(() => true);
      Sinon.stub(User, 'destroy').resolves()

      const token = 'my-auth-token'
      const chaiHttpResponse = await chai
        .request(app)
        .delete('/users/1')
        .set('Authorization', `Bearer ${token}`)

      expect(chaiHttpResponse.status).to.be.equal(204)
    })
  })

  afterEach(() => {
    Sinon.restore();
  });
})