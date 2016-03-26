
module.exports = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(game_state, bet) {
    bet(game_state.minimum_raise + (50 * (game_state.bet_index + 1)));
  },

  showdown: function(game_state) {

  }
};
