var glob = require('glob')
var path = require('path')
var fs = require('fs')

/**
 * 加载用户列表
 */
function load_users() {
  var users = []
  var files = glob.sync(path.join(__dirname, '../users/**/*.json'))

  files.forEach(function (file) {
    var user = JSON.parse(fs.readFileSync(file))
    users.push(user)
    console.log('load user: ' + file)
  })
  return users
}
/**
 *  登陆用户
 * 
 * @param {any} username
 * @param {any} password
 * @returns
 */
function login(username, password){
  var users = load_users();
  for(var i=0; i<users.length; i++){
    if(users[i].username === username && users[i].password === password){
      return true
    }
  }
  return false
}

/**
 * 获取用户的信息
 * 
 * @param {any} username
 * @param {any} password
 * @returns
 */
function get_user_info(username, password){
  var users = load_users();
    for(var i=0; i<users.length; i++){
      if(users[i].username === username && users[i].password === password){
        return users[i]
      }
    }
}


module.exports = {
  login: login,
  get_user_info: get_user_info
}
