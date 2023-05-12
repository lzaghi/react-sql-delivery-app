const chai = require("chai")
const chaiHttp = require("chai-http")
const Sinon = require("sinon");
const { Sale, SaleProduct } = require('../../database/models');
const jwt = require('jsonwebtoken');
const app = require("../../api/app");

chai.use(chaiHttp)
const { expect } = chai;

describe('Testing sales', () => {
  describe('POST /sales', () => {
    it('returns status 201 when success', async () => {
      Sinon.stub(jwt, 'verify').callsFake(() => true);
      Sinon.stub(SaleProduct, 'create').resolves()
      Sinon.stub(Sale, 'create').resolves({ id: 1 })

      const token = 'my-auth-token'
      const chaiHttpResponse = await chai
        .request(app)
        .post('/sales')
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: 1,
          sellerId: 1,
          totalPrice: 100,
          deliveryAddress: 'Rua Tal Tal',
          deliveryNumber: 123,
          cart: {
            1: {
              qtty: 1
            },
            2: {
              qtty: 0
            }
          }
        })

      expect(chaiHttpResponse.status).to.be.equal(201)
    })
  })
  describe('GET /sales/user', () => {
    it('returns status 200 when success', async () => {
      Sinon.stub(jwt, 'verify').callsFake(() => true);
      Sinon.stub(jwt, 'decode').returns({ userId: 1});
      Sinon.stub(Sale, 'findAll').resolves()

      const token = 'my-auth-token'
      const chaiHttpResponse = await chai
        .request(app)
        .get('/sales/user')
        .set('Authorization', `Bearer ${token}`)

      expect(chaiHttpResponse.status).to.be.equal(200)
    })
  })
  describe('GET /sales/details/:id', () => {
    it('returns status 200 when success', async () => {
      Sinon.stub(jwt, 'verify').callsFake(() => true);
      Sinon.stub(Sale, 'findOne').resolves()

      const token = 'my-auth-token'
      const chaiHttpResponse = await chai
        .request(app)
        .get('/sales/details/1')
        .set('Authorization', `Bearer ${token}`)

      expect(chaiHttpResponse.status).to.be.equal(200)
    })
  })
  describe('GET /sales/seller', () => {
    it('returns status 200 when success', async () => {
      Sinon.stub(jwt, 'verify').callsFake(() => true);
      Sinon.stub(jwt, 'decode').returns({ userId: 1});
      Sinon.stub(Sale, 'findAll').resolves()

      const token = 'my-auth-token'
      const chaiHttpResponse = await chai
        .request(app)
        .get('/sales/seller')
        .set('Authorization', `Bearer ${token}`)

      expect(chaiHttpResponse.status).to.be.equal(200)
    })
  })
  describe('PATCH /sales/:id', () => {
    it('returns status 201 when success', async () => {
      Sinon.stub(jwt, 'verify').callsFake(() => true);
      Sinon.stub(Sale, 'update').resolves()

      const token = 'my-auth-token'
      const chaiHttpResponse = await chai
        .request(app)
        .patch('/sales/1')
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'Novo Status',
        })

      expect(chaiHttpResponse.status).to.be.equal(204)
    })
  })

  afterEach(() => {
    Sinon.restore();
  });
})