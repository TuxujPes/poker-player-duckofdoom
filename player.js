var log = console.log.bind(console);

var bot = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(gs, bet) {
    this.GS = gs;

    var money = 0;
    var min_raise = gs.minimum_raise + 2 * gs.small_blind;

    try {

      if (this.isHandPair() || this.isTablePairOrMore()) {
        if (this.isSet()){
          money = this.getOurPlayer().stack;
        } else {
          money = min_raise * 2;
        }
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

  getTableCards: function() {
    return this.GS.community_cards;
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

  isHandPair: function() {
    var cards = this.getOurCards();

    return cards[0].rank === cards[1].rank;
  },

  isTablePairOrMore: function() {
    var hash = this.getCardsHash();
    for (var key in hash) {
      if (hash[key] > 1) {
        return true;
      }
    }

    return false;
  },
  isSet: function() {
    var hash = this.getCardsHash();
    for (var key in hash) {
      if (hash[key] == 3) {
        return true;
      }
      return false;
    }

  },
  isFlopHanded: function() {
    return this.GS.community_cards.length;
  },
  getCardsHash: function() {
    var table = this.getTableCards();
    var our = this.getOurCards();
    var allcards = table.concat(our);
    var hash = {};
    var rank;

    for (var i = 0; i < allcards.length; i++) {
      rank = allcards[i].rank;

      hash[rank] = hash[rank] ? hash[rank] + 1  : 1;
    }

    return hash;
  }
};

module.exports = bot;
