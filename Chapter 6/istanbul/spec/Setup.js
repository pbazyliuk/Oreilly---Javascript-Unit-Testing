var fs = require('fs');
var path = require('path');
var parse = require('csv-parse');

var Club = require('../Club');
var Roster = require('../Roster');
var Player = require('../Player');

function setup(cb) {
  var clubs = {};

  var data = fs.readFileSync(path.join(__dirname, 'player.data'), 'utf8');

  parse(data, { 
    columns: [
      'id',
      'number',
      'position',
      'name',
      'team',
      'age',
      'height',
      'weight',
      'country',
      'status'
    ], escape: '\\', delimiter: ' ' }, function(error, players) {
      if (error) {
        cb(error);
      } else {
        players.forEach(function(player) {
          if (!clubs[player.team]) {
            clubs[player.team] = new Club(player.team, new Roster(), 50000000);
          } 
          player.salary = Math.floor(Math.random() * (10000000 - 100000)) + 100000;
          clubs[player.team].addPlayer(new Player(player));
        });
      cb(null, clubs);
      }
  });
};

module.exports = setup;
