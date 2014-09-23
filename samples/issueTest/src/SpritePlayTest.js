
var SpritePlayTestLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.BasketBoxAction0plist);

        var animFrames = [];
        var str = "";
        var frame;
        for (var i = 1; i < 5; i++) {
            str = "baller00" + (i < 10 ? ("0" + i) : i) + ".png";
            frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.3);
        this._sprite1 = new cc.Sprite();
        //this._sprite1.runAction(cc.animate(animation).repeatForever());
        this._sprite1.setSpriteFrame("baller0003.png");
        this._sprite1.attr({
            x:100,
            y:100
        });
        this.addChild(this._sprite1);

        ccs.armatureDataManager.addArmatureFileInfo(res.BasketBoxAction);
        this._boxAction = ccs.Armature.create("BasketBoxAction");
        this._boxAction.getAnimation().play("ballerAction");

        this._boxAction.setPosition(cc.p(250, 250));

        //this.addChild(this._boxAction);

        var layout = new ccui.Layout();
        this.addChild(layout);
        layout.addNode(this._boxAction);
        return true;
    }
});

var SpritePlayTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SpritePlayTestLayer();
        this.addChild(layer);
    }
});

