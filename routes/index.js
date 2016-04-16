var express = require('express')
var router = express.Router()
var child_process = require('child_process')
var webhook = require('../libs/webhook')

router.post('/handle/:platform/push', function (req, res, next) {
  var platform = req.params.platform
  var parseResult = webhook.parsePlatform(platform, req)
  var event = parseResult.event
  var branch = parseResult.branch
  var https_url = parseResult.https_url

  if (event === 'push') {
    var config = webhook.getWebhookConfig(platform, https_url, branch)
    if (config) {
      child_process.exec(config.script, {encoding: 'utf-8'}, function (err, stdout, stderr) {
        if (err) {
          res.status(400).json({
            msg: 'cmd:' + err.cmd + ' NOT work!'
          })
          return
        }
        res.status(200).json({
          msg: 'ok',
          match: config
        })
      })
    } else {
      res.status(404).json({
        msg: '找不到webhook配置'
      })
    }
  }
})

module.exports = router
