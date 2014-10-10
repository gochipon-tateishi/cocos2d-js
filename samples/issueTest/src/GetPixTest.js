
var GetPixTestLayer = cc.Layer.extend({
    sprite:null,
    readPixels:function(x,y,w,h) {
        if( 'opengl' in cc.sys.capabilities) {
            var size = 4 * w * h;
            var array = new Uint8Array(size);
            gl.readPixels(x, y, w, h, gl.RGBA, gl.UNSIGNED_BYTE, array);
            return array;
        } else {
            // implement a canvas-html5 readpixels
            return cc._renderContext.getImageData(x, winSize.height-y-h, w, h).data;
        }
    },
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var spriteTemp = new cc.Sprite(res.HelloWorld_png);
        this.addChild(spriteTemp);

        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseUp: function(event){
                var pixelArr = self.readPixels(10, 10, 1, 1);
                cc.log(pixelArr);
            }
        }, spriteTemp);

        var draw = new cc.DrawNode();
        draw.drawDot(cc.p(300, 300), 10, cc.color(191, 191, 191));
        this.addChild(draw, 10);

        return true;
    }
});

var GetPixTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GetPixTestLayer();
        this.addChild(layer);
    }
});

