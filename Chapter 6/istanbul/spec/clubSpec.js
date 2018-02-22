var Setup = require('./Setup');

describe('Club', function() {
  beforeEach(function(done) {
    var me = this;
    Setup(function(err, clubs) {
      if (err) {
        throw new Error('Error settup on data:', err);
        done();
      } else {
        me.clubs = clubs;
        done();
      }
    });
  });

  it('has clubs', function() {
    expect(this.clubs).not.toBeUndefined();
    expect(this.clubs['LA Galaxy']).toBeTruthy();
  });

  it('has roster', function() {
    var roster = this.clubs['LA Galaxy'].getRoster();
    expect(roster).toBeDefined();
  });

  it('has forwards', function() {
    var forwards = this.clubs['LA Galaxy'].getForwards();
    expect(forwards).toBeDefined();

    // expect Robbie Keane to be a forward on LA Galaxy
    expect(forwards.filter(function(player) { return player.name.match(/Keane/); }).length).toBe(1);
  });

  it('adds players', function() {
    var defenders = this.clubs['Seattle Sounders FC'].getDefenders();
    var aRandomDefender = defenders.pop();

    var origColumbusDefs = this.clubs['Columbus Crew SC'].getDefenders();
    this.clubs['Columbus Crew SC'].addPlayer(aRandomDefender);
    var newColumbusDefs = this.clubs['Columbus Crew SC'].getDefenders();

    expect(origColumbusDefs).not.toContain(aRandomDefender);
    expect(newColumbusDefs).toContain(aRandomDefender);
  });

  it('removes players', function() {
    var origDefenders = this.clubs['Houston Dynamo'].getDefenders();
    var aRandomDefender = origDefenders[3];
    var newDefenders = this.clubs['Houston Dynamo'].removePlayer(aRandomDefender);

    expect(newDefenders).not.toContain(aRandomDefender);
    expect(origDefenders).toContain(aRandomDefender);
  });

  // Let's trade Kyle Beckerman for Austin Berry and $50k
  it('trades players', function() {
    var tradeValue = 50000;

    var RSL = this.clubs['Real Salt Lake'];
    var rslBudget = RSL.getBudget();
    var kyle = RSL.getPlayer('Kyle Beckerman');
    expect(kyle).toBeTruthy();

    var PU = this.clubs['Philadelphia Union'];
    var puBudget = PU.getBudget();
    var austin = PU.getPlayer('Austin Berry');
    expect(austin).toBeTruthy();

    RSL.tradePlayer(kyle, PU, austin, tradeValue);

    expect(RSL.getBudget()).toBe(rslBudget + tradeValue);
    expect(PU.getBudget()).toBe(puBudget - tradeValue);

    expect(RSL.isPlayerOnRoster(austin)).toBeTruthy();
    expect(RSL.isPlayerOnRoster(kyle)).not.toBeTruthy();

    expect(PU.isPlayerOnRoster(kyle)).toBeTruthy();
    expect(PU.isPlayerOnRoster(austin)).not.toBeTruthy();
  });
});
