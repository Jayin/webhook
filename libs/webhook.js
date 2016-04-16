var glob = require('glob')
var path = require('path')
var _ = require('lodash')
var Platform = require('./platform')

/**
 * 加载配置
 */
function load_config(){
  // webhook config
  var configs = []
  var files = glob.sync(path.join(__dirname, '../webhooks/**/*.json'))

  files.forEach(function (file) {
    var config = require(file)
    configs.push(config)
  })
  return configs 
}
/**
 * 获取webhook配置
 * @param {string} platform 平台
 * @param {string} https_url 仓库地址
 * @param {string} branch 分支
 */
module.exports.getWebhookConfig = function (platform, https_url, branch) {
  var configs = load_config()
  for (var index = 0;index < configs.length;index++) {
    var config = configs[index]
    
    if(config.platform !== platform || config.https_url !== https_url){
      continue;
    }
    //branch 监听处理的分支，若为*则匹配所有分支
    if ( config.branch !== '*' && config.branch !== branch) {
      continue
    }
    return config
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
