class exports.NotificationElement extends Backbone.View
  className : "notification_element"
  
  render : ->
    @el = @$(@el)
    vals = @model.toJSON()
    vals.id = @model.id
    @el.html require("templates/notification_element")(vals)
    window.setTimeout @hide, 5000
    @el.click @hide
    @

  hide : =>
    that = this
    @el.fadeOut "slow", ->
      that.el.remove()
    