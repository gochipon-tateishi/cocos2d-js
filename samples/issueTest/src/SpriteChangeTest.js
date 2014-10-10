
var SpriteChangeTestLayer = cc.Layer.extend({
    _sprite:null,
    _self:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        _self = this;

        this._sprite = new cc.Sprite(res.HelloWorld_png);
        this.addChild(this._sprite);

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseUp: function(event){
                _self._sprite.setTexture(res.CloseNormal_png);
            }
        }, this._sprite);



        return true;
    }
});

var SpriteChangeTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SpriteChangeTestLayer();
        this.addChild(layer);
    }
});

