class exports.GameView extends Backbone.View
  initialize : ->
    @el = $("#content")
    @template = require "templates/game_view"
    @model.bind "change:moves_needed", @update_moves
    @model.bind "gameover", @game_over
    @original_moves = @model.get('moves_needed') unless @model.get('moves_needed') < 0

  render : ->
    vals = @model.toJSON()
    vals.original_moves = @original_moves
    vals.player = vals.player || app.configs.player || "unnamed" 
    @el.html(@template(vals))
    $('#player_name').blur @update_name    
    @legacy()
  
  update_name : (e) =>
    element = $(e.currentTarget)
    @model.set "player" : element.val()
    app.configs.player = element.val()

  update_moves : (model, moves) =>
    $('#stats').html("Moves: #{moves}")

  game_over : =>
    
    
    @link = "http://brunch-colors.com/#/play/#{@model.id}"
    
    vals = 
      original_moves : @original_moves
      moves_needed : @model.get('moves_needed')
      link : @link
    
    $('#messagez').html(require("templates/GameOver")(vals))
    $("#canvas").remove()
    
    if !vals.original_moves or vals.original_moves > vals.moves_needed
      @model.save()
      @start_FB() if window.FB
      
      
  start_FB : ->
    that = this
    show_login = ->
      $('#fb').html('<fb:login-button perms="publish_stream" show-faces="true" width="400" max-rows="1"></fb:login-button>')
      if FB
        FB.XFBML.parse()
    moves = @model.get("moves_needed")
    render_post_button = ->
      $('#fb').html("<button id='fb_post'>Challenge your friends on Facebook</button>")
      $('#fb_post').click ->
        if FB
          FB.ui(
              method: 'feed'
              message: "Can you beat my highscore on Brunch-Colors? (#{moves} moves)"
              link: that.link
              picture: "http://img.ly/system/uploads/000/735/352/original_brunch_logo.png"
              ,
            (response) ->
            
          )
    
    FB.getLoginStatus (response) ->
      if response.session
        render_post_button()    
      else
        show_login()
    
    FB.Event.subscribe 'auth.login', (response) ->
      render_post_button()
    

  legacy : ->
    `
    that = this;
    window.cb = {
    	testfield : "124312343123412332123431231344432"
    };
    cb.users = [{
    	name : "John",
    	lastColor : -1,
    	steps : 0,
    	fillColor : "#999",
    	fieldPercentage : 0
    }];

    cb.activeUser = 0;

    cb.colors = ["#E54661","#FFA644","#998A2F","#2C594F","#002D40"];

    cb.field = null;

    cb.logic = {
    	// 0:singpleplayer, 1:2playerround, 2:2playerkamikaze
    	mode : 0,
    	player : 1,
    	opponent  : 2,
    	free : -1,
    	stop : "#",
    	init : function(){
    		//	TODO: only single player atm
    		cb.field.possessions[0][0] = 0;
    		cb.ui.init();
    		cb.ui.update();
    	},
    	next : function(color){
    	    if(!cb.logic.isGameOver()){
    		    cb.logic.recalcField(color, cb.activeUser);
    		    cb.users[cb.activeUser].steps++;
    		    that.model.set({"moves_needed" : cb.users[cb.activeUser].steps});
    		    cb.ui.update();
    		}else{
    		    //console.log("Game is over");
    		}
    	},
    	recalcField : function(_newColor,_by){
    		var l1 = cb.field.possessions.length;
    		var l2 = cb.field.possessions[0].length;
    		for(var y = 0; y<l1; y++){

    			for(var x = 0; x < l2; x++){
    				if(cb.logic.fieldIsColor(_newColor,x,y) && cb.logic.fieldIsFree(x, y) 
    				        && cb.logic.playerHasNeighbourField(_by, x, y)){
    					cb.logic.takePossessionOf(_by,_newColor, x, y)
    				}
    			}
    		}
    		cb.logic.updateColorsByPlayer(_newColor, _by);
    	},
    	isGameOver : function(){
    	    return (cb.users[cb.activeUser].fieldPercentage == 100);
    	}, 
    	fieldIsColor : function(color,x,y){
    		return (cb.field.colors[y][x] == color);
    	},
    	fieldIsFree : function(x,y){
    		return (cb.field.possessions[y][x] == cb.logic.free);
    	},
    	playerHasNeighbourField : function(player,x,y){
    		if(x > 0 && cb.field.possessions[y][x-1] == player) // to the left
    			return true;
    		if(x < cb.field.possessions[y].length - 1 && cb.field.possessions[y][x+1] == player) // to the right
    			return true;
    		if(y > 0  && cb.field.possessions[y-1][x] == player) // above
    			return true;
    		if(y < cb.field.possessions.length -1  && cb.field.possessions[y+1][x] == player) // underneath
    			return true;
    		return false;
    	},
    	takePossessionOf : function(player,color,x,y){
    	  cb.field.possessions[y][x] = player;
    		cb.field.colors[y][x] = color;
    	  if(x > 0 && cb.logic.fieldIsColor(color,x-1,y) && cb.field.possessions[y][x-1] != player){ // to the left
    			this.takePossessionOf(player,color,x-1,y);
    		}
    		if(x < cb.field.possessions[y].length - 1 && cb.logic.fieldIsColor(color,x+1,y) && cb.field.possessions[y][x+1] != player){ // to the right
    			this.takePossessionOf(player,color,x+1,y);
    		}
    		if(y > 0  && cb.logic.fieldIsColor(color,x,y-1) && cb.field.possessions[y]-1[x] != player){ // above
    			this.takePossessionOf(player,color,x,y-1);
    		}
    		if(y < cb.field.possessions.length -1  && cb.logic.fieldIsColor(color,x,y+1) && cb.field.possessions[y+1][x] != player){ // underneath
    			this.takePossessionOf(player,color,x,y+1);
    		}
    	},
    	updateColorsByPlayer : function(_color,_player){
    		var len1 = cb.field.colors.length;
    		var len2 = cb.field.colors[0].length;
    		var totalRects = len1*len2;
    		var playerRects = 0;
    		for(var i = 0; i < len1; i++){
    			for(var j = 0; j < len2; j++){
    				if(cb.field.possessions[i][j] == _player){
    					cb.field.colors[i][j] = _color;
    					playerRects++;
    				}
    			}
    		}

    		if(playerRects == totalRects)
    		    cb.users[_player].fieldPercentage = 100;
    		else
    		    cb.users[_player].fieldPercentage = Math.floor(100 * (playerRects/totalRects));
    	}
    };

    cb.ui = {
      model : this.model,
        init : function(){
            this.showAllColors();
        },
    	update : function(){
    		displayField(cb.field.colors);
    		var act = cb.users[cb.activeUser];
    		//console.log("Steps count: " + act.steps + "Percentage: " + act.fieldPercentage);
        if(act.fieldPercentage == 100){
          this.model.set({ "field" : cb.field });
          this.model.trigger("gameover");
        }
		    var vals = {
		      "moves_needed" : act.steps
		    };
		    this.model.set(vals);
    	},

    	showAllColors : function(){
    		var newHtml = "";
    		var len = cb.colors.length;
    		for(var i = 0; i < len; i++){
    			newHtml += "<li class='color' style='background-color:"+cb.colors[i]+";color:"+cb.colors[i]+";'></li>";
    		}
    		newHtml += "";
    		$('#controls').html(newHtml);

    		eachChildTag(id('controls'),"li",function(elem,index){
    		    action(elem,function(){
    		        cb.logic.next(index);
    		    });
    		});
    	}
    };

    window.Utils = {
    	makeArrayOfChars : function(str,len){
    		ret = [];
    		row = [];
    		strlen = str.length;
    		for ( var ind = 0; ind < strlen; ind++) {
    			currChar = str[ind];
    			row.push(currChar);
    			if(row.length == len){
    				ret.push(row);
    				row = [];
    			}
    		}
    		return ret;
    	},
    	printField : function(_field){
    	    //calculate rect sizes
    	    var width = Math.floor(canvasR.width / _field.length);
    	    var height = Math.floor(canvasR.height / _field[0].length);
    	    len = _field.length;
    	    var a = new Date();
    		for(i = 0; i < len; i++){
    			len2 = _field[i].length;

    			for(u=0; u < len2; u++){
    				var color = cb.colors[cb.field.colors[i][u]];
    				if(cb.field.possessions[i][u] != -1){
    				    color = cb.users[cb.field.possessions[i][u]].fillColor;
    				}
    				canvasR.rect((i)*width,(u)*height,width,height,color);
    			}
    		}
    	},
    	generateRandomField : function(_width,_height,_colors){
    		field = {};
    		field.colors = _colors || [];
    		field.possessions = [];
    		currow = [];
    		currowPos = [];
    		for(i = 0; i < _height; i++){
    			currow = [];
    			currowPos = [];
    			for(u = 0; u < _width; u++){
    				currow.push(Utils.generateRandomColor(cb.colors.length));
    				currowPos.push(cb.logic.free);
    			}
    			if(!_colors)
            field.colors.push(currow);
          field.possessions.push(currowPos);
    		}
    		field.original = []
    		for(i = 0; i < _height; i++){
    		  field.original.push([])
    		  for(u = 0; u < _width; u++){
    		    field.original[i].push(field.colors[i][u]);
    			}
    		}
    		return field;
    	},
    	generateRandomColor : function(nrColors){
    		ret = Math.random() * (nrColors-1);
    		return  Math.floor(ret + 0.5);
    	}
    };

    function displayField(_f){

    	Utils.printField(_f);
    };
    canvasR.init(document.getElementById('canvas'));
    window.cb.field = window.Utils.generateRandomField(20,20,this.model.get("field").original);
    window.cb.logic.init();

    `
    @