var assert = require('assert');
var Server = require('./server');
var StarWarsAPI = require('./StarWars');

function testGetCrawlStarWars(done) {
  var server = Server.createServer(8000, function() {
    var starWars = new StarWarsAPI('http://localhost:8000');
    starWars.getCrawl(4, function(err, crawl) {
      assert(crawl === "Some awesome crawl");
      done();
    });
  }, function(req, res) {
    assert(req.url === '/films/4');
    res.end(JSON.stringify({ opening_crawl: "Some awesome crawl" }));
  });
}

testGetCrawlStarWars(function() {
  // all done!
  console.log('all done!');
  process.exit(0);
});
