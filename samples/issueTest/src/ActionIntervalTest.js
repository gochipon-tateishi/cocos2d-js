var CountBMTextLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var label = cc.LabelTTF.create("0","Arial",20);
        label.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));

        var count = cc.countBMTextNumber(0,100,1);
        //var action = cc.spawn(cc.fadeIn(.6).easing(cc.easeBounceOut()));
        label.runAction(cc.sequence(cc.delayTime(.4),count));
        this.addChild(label);
        return true;
    }
});

var CountBMTextScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new CountBMTextLayer();
        this.addChild(layer);
    }
});


var CountBMTextNumber = cc.ActionInterval.extend({
    _from:0,
    _to:0,
    _duration:0,
    _accTime:0,
    _label:null,
    _postStr:null,
    ctor: function (f, t, d, post) {
        this._super(arguments);
        //cc.ActionInterval.prototype.ctor.call(this);
        this._from = f;
        this._to = t;
        this._duration = d;
        this._postStr = post;
    },

    /**
     * Start the action with target.
     * @param {cc.Label} target
     */
    startWithTarget:function (target) {
        this._super(arguments);
        //cc.ActionInterval.prototype.startWithTarget.call(this, target);
        this._label = target;
        this._label.retain();
        cc.MotionStreak
    },
    /**
     *
     * @param {Number}  dt
     */
    update:function (dt) {
        var number = this._from + (this._to - this._from) * dt;
        number = number.toFixed(0);
        if(this._label && this._label.setString){
            var text = number + this._postStr;
            this._label.setString(text);
        }
    }
});

cc.countBMTextNumber = function (f, t, d, post) {
    if(arguments.length<4){
        post = "";
    }
    return new CountBMTextNumber(f, t, d, post);
};