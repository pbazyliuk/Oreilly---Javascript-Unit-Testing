var http = require('http');

module.exports = {
  createServer: function(port, started, handler) {
    //Create a server
    var server = http.createServer(handler);

    //Lets start our server
    server.listen(port, function(){
      started();
    });
  }
}

