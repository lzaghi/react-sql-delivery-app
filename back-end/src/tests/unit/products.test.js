const chai = require("chai")
const chaiHttp = require("chai-http")
const Sinon = require("sinon");
const { Product } = require('../../database/models');
const jwt = require('jsonwebtoken');
const app = require("../../api/app");

chai.use(chaiHttp)
const { expect } = chai;

describe('Testing products', () => {
  describe('GET /products', () => {
    it('returns status 401 with no token', async () => {
      Sinon.stub(Product, 'findAll').resolves()
      
      const chaiHttpResponse = await chai
        .request(app)
        .get('/products')

      expect(chaiHttpResponse.status).to.be.equal(401)
    })

    it('returns status 401 with invalid token', async () => {
      Sinon.stub(Product, 'findAll').resolves()
      
      const token = 'my-auth-token'
      const chaiHttpResponse = await chai
        .request(app)
        .get('/products')
        .set('Authorization', `Bearer ${token}`)

      expect(chaiHttpResponse.status).to.be.equal(401)
    })

    it('returns status 200 with valid token', async () => {
      Sinon.stub(jwt, 'verify').callsFake(() => true);
      
      Sinon.stub(Product, 'findAll').resolves()
      
      const token = 'my-auth-token'
      const chaiHttpResponse = await chai
        .request(app)
        .get('/products')
        .set('Authorization', `Bearer ${token}`)

      expect(chaiHttpResponse.status).to.be.equal(200)
    })

    afterEach(() => {
      Sinon.restore();
    });
  })
})