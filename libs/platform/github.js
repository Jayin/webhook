/**
 * @param {object} req http req
 */

var parse = function(req){
  return {
    platform: 'github',
    https_url: req.body.repository.clone_url,
    event: req.headers['x-github-event'].toLowerCase(),
     // ref	string	The full Git ref that was pushed. Example: "refs/heads/master". 
  //    https://developer.github.com/v3/activity/events/types/#pushevent
    branch: req.body.ref.split('/')[req.body.ref.split('/').length - 1]
  }
}
module.exports.parse = parse 
