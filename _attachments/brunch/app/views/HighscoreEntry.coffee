class exports.HighscoreEntry extends Backbone.View
  tagName : "tr"
  
  initialize : ->
    @el = $(@el)   
    @template = require("templates/HighscoreEntry")
    
  render : ->
    @el.html @template(@model)
    @