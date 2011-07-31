class exports.InstructionsView extends Backbone.View
  
  initialize : ->
    @el = $("#content")
    @template = require "templates/instructionsview"
    
  render : ->
    @el.html(@template())