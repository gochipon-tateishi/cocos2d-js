var LabelBMFontLayer = cc.LayerColor.extend({
    sprite: null,
    ctor: function (color) {

        this._super(color);

        var label1 = new cc.LabelBMFont("Test1234567890", res.mynum_fnt);
        label1.attr({
            x:400,
            y:100
        });
        label1.setAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.addChild(label1);

        // 需要设置这个函数，否则会导致在jsb下有黑边
        if (cc.sys.isNative)
        {
            label1.setBlendFunc(cc.ONE, cc.ONE_MINUS_SRC_ALPHA);
        }


        label1.setColor(cc.color(255, 0, 0, 255));

        var restLabel = new cc.LabelTTF("1111111111", "Arial", 80);
        restLabel.color = cc.color.WHITE;
        restLabel.enableStroke(cc.color.BLACK, 3);
        this.addChild(restLabel);
        restLabel.attr({
            x:400,
            y:300
        });

        return true;
    }
});

var LabelBMFontScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new LabelBMFontLayer(cc.color(255, 255, 255, 128));
        this.addChild(layer);
    }
});



