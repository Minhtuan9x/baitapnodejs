var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app.js');
var should = chai.should();

chai.use(chaiHttp);

it('should list ALL blobs on /blobs GET', function(done) {
    chai.request(server)
      .get('/student')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });