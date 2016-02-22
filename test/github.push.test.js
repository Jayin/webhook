var app = require('../app.js')
var http = require('http')
var server = http.createServer(app)
var superagent = require('superagent')
var should = require('should')


describe('GitHub PUSH', function () {
  
  beforeEach(function (done) {
    server.listen(3001, function(err){
      if(err){
        // console.log(err)
        process.exit(1)
      }
      done()
    })
  });
  
  it('正确响应', function (done) {
    superagent
      .post('http://localhost:3001/handle/github/push')
      .set('X-Github-Event', 'push')
      .set('X-Hub-Signature', '123123')
      .set('X-Github-Delivery', '2333333')
      .send(require('./fixtures/github.post.json'))
      .end(function (err, res) {
        should.not.exist(err)
        res.should.have.properties({statusCode: 200})
        done()
      })
  });
  
  after(function (done) {
    server.close(function(){
      done()
    })
  });
  
});
