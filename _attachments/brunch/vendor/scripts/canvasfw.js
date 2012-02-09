var canvasR = {
    context : null,
    width : 0,
    height : 0,
    "init" : function(_canvasElem){
        this.context = _canvasElem.getContext('2d');
        this.update();
    },
    "update" : function(){
        this.width = this.context.canvas.width;
        this.height = this.context.canvas.height;
    },
    "rect" : function(x,y,width,height,color){
        this.context.fillStyle = color;
        this.context.fillRect(x,y,width,height);
    },
    "alpha" : function(_alpha){
        this.context.globalAlpha = _alpha;
    }
};