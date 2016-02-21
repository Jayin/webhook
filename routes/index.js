var express = require('express');
var router = express.Router();
var child_process = require('child_process')

/* GET home page. */
router.post('/handle/coding/push', function(req, res, next) {
  if(req.body.event.toLowerCase() === 'push'){
    console.info('this is a push action!')
    var config = require('../webhooks/'+req.body.repository.name+'.conf.json')
    if(config.repo !== req.body.repository.https_url || config.branch !== req.body.repository.name){
      // console.info('匹配conf.json成功!')
      // console.log('==>'+config.script)
      // var result = child_process.execSync(config.script, {encoding: 'utf-8'})
      child_process.exec(config.script, {encoding: 'utf-8'},function(err, stdout, stderr){
        if(err){
          // console.log('err!!')
          // console.log(err)
          res.status(400).json({
            msg: 'cmd:'+err.cmd + ' NOT work!'
          })
          return
        }
        res.status(200).json({
          msg: 'ok'
        })      
      })
    }
  }
  
});


module.exports = router;
