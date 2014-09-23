/**
 * Created by leo on 14-9-23.
 */

var BmFontTestLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        //用了BMfont的话，在微信上看就会出现些难看的黑点。
        var layerColor = new cc.LayerColor(cc.color(88,88,88));
        this.addChild(layerColor);


        var label1 = new cc.LabelBMFont("fonttest",res.ArialBold_90fnt);
        var label2 = new cc.LabelBMFont("fonttest",res.arialBold90fnt);
        label1.x = 200;
        label1.y = 200;
        label2.x = 200;
        label2.y = 400;
        this.addChild(label1);
        this.addChild(label2);

        cc.Sprite

        cc.TextureCache.getInstance().addImage()

        return true;
    }
});

var BmFontTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new BmFontTestLayer();
        this.addChild(layer);
    }
});