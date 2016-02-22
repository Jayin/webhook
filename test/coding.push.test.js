var app = require('../app.js')
var http = require('http')
var server = http.createServer(app)
var superagent = require('superagent')
var should = require('should')

describe('Coding PUSH', function () {
  
  beforeEach(function (done) {
    server.listen(3001, function(err){
      if(err){
        console.log(err)
        process.exit(1)
      }
      done()
    })
  });
  
  it('正确响应', function (done) {
    superagent
      .post('http://localhost:3001/handle/coding/push')
      .send(require('./fixtures/coding.post.json'))
      .end(function (err, res) {
        should.not.exist(err)
        res.should.have.properties({statusCode: 200})
        done()
      })
  });
  
  it('404:找不到配置', function (done) {
     superagent
      .post('http://localhost:3001/handle/coding/push')
      .send(require('./fixtures/coding.post2.json'))
      .end(function (err, res) {
        should.exist(err)
        res.should.have.properties({statusCode: 404})
        done()
      })
  });
  
  after(function (done) {
    server.close(function(){
      done()
    })
  });
});
