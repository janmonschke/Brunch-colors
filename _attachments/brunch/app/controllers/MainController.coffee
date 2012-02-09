{LoadingView} = require("views/LoadingView")
{HomeView} = require("views/home_view")
{InstructionsView} = require("views/InstructionsView")
{GameView} = require("views/game_view")
{HighscoreView} = require("views/HighscoreView")
{NotificationView} = require("views/notification_view")

{Game} = require("models/game")

{GamesCollection} = require("collections/games_collection")

class exports.MainController extends Backbone.Router
  routes :
    "": "home"
    "/": "home"
    "/home": "home"
    "/homebmb=1": "home"
    "/instructions" : "instructions"
    "/play/new" : "play_new"
    "/play/:id" : "play"
    "/highscores" : "highscores"

  constructor: ->
    super
    
    app.collections.games = new GamesCollection()
    
    # trigger google analytics
    @bind "all", (msg) ->
      if _gaq?
        _gaq.push ['_trackPageview', msg.replace(/route:/,'')]
    
    # hide address bar in iOS
    setTimeout ->
      window.scrollTo 0, 1
    , 100
        
    # load ads if not in a iframe (FB)
    
    @init_loading_view()
    @init_notifications()  

  home: ->
    @navigate("/home")
    new HomeView().render()

  instructions : ->
    @navigate("/instructions")
    new InstructionsView().render()

  play_new : ->
    that = this
    app.views.loadingview.show("Generating new field...")
    $.ajax(
      url : "/_uuids"
      dataType : "json"
      success : (resp) ->
        game = new Game()
        game.id = resp.uuids[0]
        game.set  "_id" : game.id
        app.collections.games.add game, silent : true
        that.play(game.id)
      error : ->
        alert "Couldn't connect to DB-Server, try again later!"
      complete : ->
        app.views.loadingview.hide()
    )
    

  play : (id) ->
    @navigate("/play/#{id}")
    game = app.collections.games.get(id)
    that = this
    if game?
      that.get_fb_name_and_render_game(game)
    else
      app.views.loadingview.show("Loading field...")
      $.ajax(
        url : "/brunch_colors/#{id}"
        dataType : 'json'
        success : (game) ->
          game = new Game(game)
          app.collections.games.add game, silent : true
          that.get_fb_name_and_render_game(game)
        error : ->
          alert("Couldn't find game by id. Started new game instead.")
          that.play_new()
          
      )
      
  get_fb_name_and_render_game : (game) ->
    if window.FB
      FB.api '/me', (response) ->
        if response.name
          game.set 'player' : response.name
        new GameView(model : game).render()
        app.views.loadingview.hide()
    else
      new GameView(model : game).render()
    
      
  highscores : ->
    @navigate("/highscores")
    new HighscoreView()
  
  init_loading_view : ->
    app.views.loadingview = new LoadingView()
  
  init_notifications: ->
    $("#add").click ->
      g = new Game()
      app.collections.games.add(g)
      g.save()
    new NotificationView().render()