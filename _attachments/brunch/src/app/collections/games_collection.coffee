{Game} = require("models/game")

class exports.GamesCollection extends Backbone.Collection
  model : Game
  url : "/games"