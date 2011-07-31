class exports.Game extends Backbone.Model
  defaults : 
    "moves_needed" : -1
    "free" : -1
    "stop" : "#"
    "colors" : ["#0000ff","#ff5555","#00ffaa","#ee00ff","#fff000"]
    "field" : {}

  initialize : (opts) ->
    @set "created_at" : new Date().getTime()
    @set "player" : app.configs.player || opts.player || "unnamed"
    @set "original_player" : opts.player if opts.player?
    
  next : (color) ->
    unless @game_is_over()
      @recalc_field color, 0
      moves = @get "moves_needed"
      moves++
      @set "moves_needed" : moves
    else
      @trigger "game_over"

  recalc_field : (_newCcolor, player) ->
    

  game_is_over : ->
    "test"