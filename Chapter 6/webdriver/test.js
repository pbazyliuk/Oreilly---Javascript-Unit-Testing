var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'phantomjs' } };
var client = webdriverio.remote(options);
 
client
    .init()
    .url('SpecRunner.html')
    .getTitle().then(function(title) {
        console.log('Title is: ' + title);
    })
    .saveScreenshot('screen.png').then(function() {
      end();
    })
