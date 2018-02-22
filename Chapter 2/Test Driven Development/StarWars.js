var http = require('http');
var StarWars = function(baseUrl) {
  this.baseUrl = baseUrl;
}
StarWars.prototype.getCrawl = function(movie, cb) {
  http.get(this.baseUrl + '/films/' + movie, function(res) {
    var response = '';
    res.on('data', function(chunk) {
      response += chunk.toString();
    });
    res.on('end', function() {
      cb(null, JSON.parse(response).opening_crawl);
    });
  });
}

module.exports = StarWars;
