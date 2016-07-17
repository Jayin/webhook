'use strict'

var User = require('../libs/user')

module.exports = function(req, res, next){
  if(User.login(req.body.username, req.body.password)){
    // console.log(req.username + ' 验证通过')
    req.user = User.get_user_info(req.body.username, req.body.password)
    next()
  }else{
    res.status(401).json({
      'msg': '验证用户失败'
    })
  }
}
