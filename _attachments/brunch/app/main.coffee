Backbone.couch_connector.config.db_name = "brunch_colors"
Backbone.couch_connector.config.ddoc_name = "brunch_colors_game"
Backbone.couch_connector.config.global_changes = true

window.app = {}
app.controllers = {}
app.collections = {}
app.models = {}
app.views = {}
app.configs = {}

MainController = require('controllers/MainController').MainController

# app bootstrapping on document ready
$(document).ready ->
  # init controller
  app.controllers.main = new MainController()
  Backbone.history.start()