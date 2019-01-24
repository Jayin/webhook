/**
 * @param {object} req http req
 */
var parse = function(req){
  return {
    platform: 'coding',
    https_url: req.body.repository.clone_url,
    event: req.header('X-Coding-Event').toLowerCase(),
    branch: req.body.ref || ''
  }
}

module.exports.parse = parse
