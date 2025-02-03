const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Ensure correct path to your Express app
const FAQ = require('../src/models/faqModel');

const { expect } = chai;
chai.use(chaiHttp);

describe('FAQ Model & API', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('should create a new FAQ document', async () => {
    const faq = new FAQ({
      question: 'What is Node.js?',
      answer: 'Node.js is a JavaScript runtime built on Chrome’s V8 JavaScript engine.',
    });

    const savedFAQ = await faq.save();
    expect(savedFAQ).to.have.property('_id');
    expect(savedFAQ.question).to.equal('What is Node.js?');
  });

  it('should fetch all FAQs via API', async () => {
    const res = await chai.request(app).get('/api/faqs');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('should return a 400 error when missing required fields', async () => {
    const res = await chai.request(app).post('/api/faqs').send({});
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error');
  });
});
