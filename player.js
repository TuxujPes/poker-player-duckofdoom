var log = console.log.bind(console);

var bot = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(gs, bet) {
    this.GS = gs;

    var money = 0;
    var min_raise = gs.minimum_raise + 2 * gs.small_blind;

    try {

      if (this.isHandPair() || this.isTablePair()) {
        if (this.isSet()) {
          money = this.getOurPlayer().stack;
        } else {
          if (this.isPairWorthPlaying()){
            money = min_raise * 10;
          }
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

  high_card_value: 11,

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
  },
  isHandPair: function() {
    var cards = this.getOurCards();

    return cards[0].rank === cards[1].rank;
  },

  isTablePair: function() {
    var table = this.getTableCards();
    var our = this.getOurCards();
    var allcards = table.concat(our);
    var hash = {};
    var rank;

    for (var i = 0; i < allcards.length; i++) {
      rank = allcards[i].rank;

      hash[rank] = hash[rank] ? hash[rank] + 1  : 1;
    }

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
  isPairWorthPlaying: function() {
    var hash = this.gerCardsHash(),
        pairedCards = [],
        countOfStrongerCards = 0;
    for (var key in hash) {
      if (hash[key] == 2) {
        pairedCards.push(this.getCardValue(hash[key]));
      }
    }
    if (pairedCards.length > 1) {
      //two pairs worth playing
      return true;
    }
    if (pairedCards[0] >= this.high_card_value){
      //is a high pair
      return true;
    } else {
      for (var key in hash) {
        if (pairedCards.indexOf(this.getCardValue(key)) == -1) {
          if (this.getCardValue(key) > pairedCards[0]){
            countOfStrongerCards++;
          }
        }
      }
      return !(countOfStrongerCards > 1);
    }
  },
};

module.exports = bot;
