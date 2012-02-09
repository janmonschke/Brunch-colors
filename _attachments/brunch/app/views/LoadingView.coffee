class exports.LoadingView extends Backbone.View
  initialize : ->
    @el = $('#loading')
    
  show : (text) ->
    @el.html("<img src='images/ajax-loader.gif' /> " + text)
    @el.slideDown()
  
  hide : ->
    @el.slideUp()