var express = require('express');
var router = express.Router();
var child_process = require('child_process')

/* GET home page. */
router.post('/handle/coding/push', function(req, res, next) {
  // console.log(res)
  console.log(req.body)
  // res.send({a: req.params.platform})
  // res.send(req.body)  
  if(req.body.event.toLowerCase() === 'push'){
    console.info('this is a push action!')
    var config = require('../webhooks/'+req.body.repository.name+'.conf.json')
    if(config.repo !== req.body.repository.https_url || config.branch !== req.body.repository.name){
      console.info('匹配conf.json成功!')
      console.log('==>'+config.script)
      var result = child_process.execSync(config.script, {encoding: 'utf-8'})
      console.log(result)
    }
  }
  res.send('test')
});


module.exports = router;
