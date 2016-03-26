const log = console.log.bind(console);


module.exports = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(game_state, bet) {
    const bet = game_state.minimum_raise + (50 * (game_state.bet_index + 1));
    log(bet);

    bet(bet);
  },

  showdown: function(game_state) {

  }
};
