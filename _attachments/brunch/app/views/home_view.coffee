class exports.HomeView extends Backbone.View
  initialize : ->
    @el = $('#content')

  render: ->
    @el.html(require("templates/home"))