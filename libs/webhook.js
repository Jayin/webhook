var glob = require('glob')
var path = require('path')
var _ = require('lodash')
var Platform = require('./platform')

// webhook config
var configs = []

var files = glob.sync(path.join(__dirname, '../webhooks/**/*.json'))

files.forEach(function (file) {
  var config = require(file)
  configs.push(config)
})

module.exports.getWebhookConfig = function (platform, https_url, branch) {
  for (var index = 0;index < configs.length;index++) {
    var config = configs[index]
    if (config.platform === platform && config.https_url === https_url && config.branch === branch) {
      return config
    }
  }
  return null
}

/**
 * @param {string} platform the webhook platform
 * @param {object} req http req
 */
module.exports.parsePlatform = function(platform, req){
  return Platform[platform].parse(req)
}
