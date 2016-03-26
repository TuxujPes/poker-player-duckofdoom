var log = console.log.bind(console);

var bot = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(gs, bet) {
    this.GS = gs;

    var money = 0;
    var min_raise = gs.minimum_raise + 2 * gs.small_blind;

    try {

      if (this.isPair()) {
        money = min_raise * 2;
      } else if (this.getOurCardSum() > 20) {
        money = min_raise;
      }


    }
    catch(err) {
      log('ERRORe', err);
    }

    log(money);

    bet(money);
  },

  showdown: function(gs) {

  },

  getOurPlayer: function() {
    var players = this.GS.players;

    for (var i = 0; i < players.length; i++) {
      if (players[i].hole_cards) {
        return players[i];
      }
    }
  },

  getOurCards: function() {
    return this.getOurPlayer().hole_cards;
  },

  getOurCardSum: function() {
    var cards = this.getOurCards();

    return cards.reduce(function(memo, card) {
      return memo + this.getCardValue(card);
    }.bind(this), 0);
  },

  getCardValue: function(card) {
    var high = {
      'J': 11,
      'Q': 12,
      'K': 13,
      'A': 14
    };

    return card.rank in high
      ? high[card.rank]
      : +card.rank;
  },

  isPair: function() {
    var cards = this.getOurCards();

    return cards[0].rank === cards[1].rank;
  }
};

module.exports = bot;
