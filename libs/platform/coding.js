/**
 * @param {object} req http req
 */
var parse = function(req){
  return {
    platform: 'coding',
    https_url: req.body.repository.https_url,
    event: req.body.event.toLowerCase(),
    branch: req.body.ref
  }
}

module.exports.parse = parse
