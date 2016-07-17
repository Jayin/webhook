var glob = require('glob')
var path = require('path')
var _ = require('lodash')
var Platform = require('./platform')
var fs = require('fs')

/**
 * 加载配置
 */
function load_config() {
  // webhook config
  var configs = []
  var files = glob.sync(path.join(__dirname, '../webhooks/**/*.json'))

  files.forEach(function (file) {
    var config = JSON.parse(fs.readFileSync(file))
    //append the file in to config
    config['file'] = path.basename(file) //文件名
    config['file_path'] = file  //文件路径
    configs.push(config)
    console.log('load config: ' + file)
  })
  return configs
}
/**
 * 是否匹配
 */
function is_match(target, cur) {
  return cur.match(new RegExp(target, 'i')) === null ? false : true;
}

/**
 * 获取webhook配置
 * @param {string} platform 平台
 * @param {string} https_url 仓库地址
 * @param {string} branch 分支
 */
module.exports.getWebhookConfig = function (platform, https_url, branch) {
  var configs = load_config()
  for (var index = 0; index < configs.length; index++) {
    var config = configs[index]

    if (!is_match(config.platform, platform)) {
      console.log(config.file + ': Unmatch platform');
      continue;
    }
    if (!is_match(config.https_url, https_url)) {
      console.log(config.file + ': Unmatch https_url');
      continue;
    }
    //branch 监听处理的分支，若为*则匹配所有分支
    if (config.branch !== '*' && branch.indexOf(config.branch) == -1) {
      console.log(config.file + ': Unmatch branch');
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
module.exports.parsePlatform = function (platform, req) {
  return Platform[platform].parse(req)
}

module.exports.load_config = load_config;
