var Player = function(obj) {
  this.id = obj.id;
  this.name = obj.name;
  this.number = obj.number;
  this.position = obj.position;
  this.age = obj.age;
  this.weight = obj.weight;
  this.height = obj.height;
  this.contry = obj.country;
  this.status = obj.status;
  this.salary = obj.salary;
};

Player.prototype.same = function(otherPlayer) {
  return this.id == otherPlayer.id;
};

module.exports = Player;
