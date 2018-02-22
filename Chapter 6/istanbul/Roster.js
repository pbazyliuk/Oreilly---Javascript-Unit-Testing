var Roster = function() {
  this.players = [];
};

Roster.prototype.add = function(player) {
  this.players.push(player);
};

Roster.prototype.remove = function(player) {
  var me = this;
  this.players.forEach(function(play, index) {
    if (play.same(player)) {
      me.players.splice(index, 1);
    }
  });
};

Roster.prototype.find = function(search) {
  return this.players.filter(search);
}

module.exports = Roster;
