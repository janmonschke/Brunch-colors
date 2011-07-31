{NotificationElement} = require("views/notification_element")

class exports.NotificationView extends Backbone.View
  initialize : ->
    @el = $('#notification-view')
    app.collections.games.bind "add", @add

  render: ->
    
  add : (model) =>
    new_element = new NotificationElement("model" : model)
    @el.append new_element.render().el