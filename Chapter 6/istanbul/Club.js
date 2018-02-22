function Club(name, roster, budget) {
  this.name = name
  this.roster = roster;
  this.budget = budget;
};

Club.prototype.getRoster = function() {
  return this.roster;  
};

Club.prototype.addPlayer = function(player) {
  this.roster.add(player);
};

Club.prototype.removePlayer = function(player) {
  this.roster.remove(player);
};

Club.prototype.updateBudget = function(money) {
  this.budget += money;
};

Club.prototype.getBudget = function() {
  return this.budget;
};

Club.prototype.getForwards = function() {
  return this.roster.find(function(player) {
    return player.position == 'F';
  });
};

Club.prototype.getDefenders = function() {
  return this.roster.find(function(player) {
    return player.position == 'D';
  });
};

Club.prototype.isPlayerOnRoster = function(myPlayer) {
  return this.roster.find(function(player) {
    return myPlayer.same(player);
  })[0];
};

Club.prototype.getPlayer = function(name) {
  return this.roster.find(function(player) {
    return player.name == name;
  })[0];
};

Club.prototype.tradePlayer = function(myPlayer, otherClub, otherPlayer, money) {
  this.removePlayer(myPlayer);
  this.addPlayer(otherPlayer);

  otherClub.addPlayer(myPlayer);
  otherClub.removePlayer(otherPlayer);

  this.updateBudget(money);
  otherClub.updateBudget(-money);
};

module.exports = Club;
