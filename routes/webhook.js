var express = require('express')
var router = express.Router()
var auth = require('../middlewares/auth')

router.use(auth)

//暂时不开放
// router.post('/webhook/create', function (req, res, next) {
//   res.status(200).json(req.user)
// })

// router.post('/webhook/edit', function (req, res, next){
//   res.send('edit')
// })

module.exports = router
