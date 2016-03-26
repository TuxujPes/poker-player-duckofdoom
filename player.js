const log = console.log.bind(console);


module.exports = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(gs, bet) {
    this.GS = gs;

    let bet = 0;

    try {
      if (this.getOurCardSum() > 20) {
        bet = gs.minimum_raise + 2 * gs.small_blind);
      }
    }

    log(bet);

    bet(bet);
  },

  showdown: function(gs) {

  },

  getOurPlayer: function() {
    const players = this.GS.players;

    for (var i = 0; i < players.length; i++) {
      if (players[i].hole_cards) {
        return players[i];
      }
    }
  },

  getOurCards: function(player) {
    return this.getOurPlayer().hole_cards;
  },

  getOurCardSum: function() {
    const cards = this.getOurCards();

    return cards.reduce(function(memo, card) {
      return memo + this.getCardValue(card);
    }.bind(this), 0);
  },

  getCardValue: function(card) {
    const high = {
      'J': 11,
      'Q': 12,
      'K': 13,
      'A': 14
    };

    return card.rank in high
      ? high[card.rank]
      : +card.rank;
  }
};
