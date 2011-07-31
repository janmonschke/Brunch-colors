{HighscoreEntry} = require("views/HighscoreEntry")
{Game} = require("models/game")

class exports.HighscoreView extends Backbone.View
  amount : "25"
  
  initialize : ->
    @template = require "templates/HighscoreView"
    @el = $('#content')
    @fetch_highscores()
  
  events :
    "click .button" : "amount_clicked"
    
  fetch_highscores : ->
    app.views.loadingview.show("Loading Highscores...")
    $.getJSON "/brunch_colors/_design/brunch_colors_game/_view/highscores?limit=#{@amount}&include_docs=true", @received  
  
  received : (data) =>
    app.views.loadingview.hide()
    @rows = data.rows
    @render()
    
  amount_clicked : (e) =>
    @amount = $(e.currentTarget).text()
    @fetch_highscores()
      
  render : ->
    @el.html @template()
    table = @$('table')
    that = this
    _.each @rows, (game) ->
      g = new Game(game.doc)
      g.id = game.doc._id
      app.collections.games.add g, silent : true
      table.append new HighscoreEntry(model : game.doc).render().el
    @delegateEvents()
    
  