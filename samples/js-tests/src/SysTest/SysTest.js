/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var sysTestSceneIdx = -1;
//------------------------------------------------------------------
//
// SysTestBase
//
//------------------------------------------------------------------
var SysTestBase = BaseTestLayer.extend({
    _title:"",
    _subtitle:"",

    ctor:function() {
        this._super(cc.color(0,0,0,255), cc.color(98,99,117,255));
    },

    onRestartCallback:function (sender) {
        var s = new SysTestScene();
        s.addChild(restartSysTest());
        director.runScene(s);
    },
    onNextCallback:function (sender) {
        var s = new SysTestScene();
        s.addChild(nextSysTest());
        director.runScene(s);
    },
    onBackCallback:function (sender) {
        var s = new SysTestScene();
        s.addChild(previousSysTest());
        director.runScene(s);
    },
    // automation
    numberOfPendingTests:function() {
        return ( (arrayOfSysTest.length-1) - sysTestSceneIdx );
    },

    getTestNumber:function() {
        return sysTestSceneIdx;
    }

});

//------------------------------------------------------------------
//
// LocalStorageTest
//
//------------------------------------------------------------------
var LocalStorageTest = SysTestBase.extend({
    _title:"LocalStorage Test ",
    _subtitle:"See the console",

    ctor:function () {
        this._super();

        var key = 'key_' + Math.random();
        var ls = cc.sys.localStorage;
        cc.log(1);
        ls.setItem(key, "Hello world");

        cc.log(2);
        var r = ls.getItem(key);
        cc.log(r);

        cc.log(3);
        ls.removeItem(key);

        cc.log(4);
        r = ls.getItem(key);
        cc.log(r);
    }

});

//------------------------------------------------------------------
//
// CapabilitiesTest
//
//------------------------------------------------------------------
var CapabilitiesTest = SysTestBase.extend({
    _title:"Capabilities Test ",
    _subtitle:"See the console",

    ctor:function () {
        this._super();

        var c = cc.sys.capabilities;
        for( var i in c )
            cc.log( i + " = " + c[i] );
    }

});

var SysTestScene = TestScene.extend({
    runThisTest:function (num) {
        sysTestSceneIdx = (num || num == 0) ? (num - 1) : -1;
        var layer = nextSysTest();
        this.addChild(layer);

        director.runScene(this);
    }
});

//------------------------------------------------------------------
//
// Script dynamic reload test
//
//------------------------------------------------------------------
var tempJSFileName = "ScriptTestTempFile.js";
var ScriptTestLayer = SysTestBase.extend({
    _tempLayer:null,
    _am : null,
    startDownload:function () {
        if (!cc.sys.isNative)
        {
            return;
        }
        var manifestPath = "Manifests/ScriptTest/project.manifest";
        var storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "JSBTests/AssetsManagerTest/ScriptTest/");
        cc.log("Storage path for this test : " + storagePath);

        if (this._am)
        {
            this._am.release();
            this._am = null;
        }

        this._am = new jsb.AssetsManager(manifestPath, storagePath);
        this._am.retain();
        if (!this._am.getLocalManifest().isLoaded())
        {
            cc.log("Fail to update assets, step skipped.");
            that.clickMeShowTempLayer();
        }
        else {
            var that = this;
            var listener = new jsb.EventListenerAssetsManager(this._am, function (event) {
                var scene;
                switch (event.getEventCode()) {
                    case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                        cc.log("No local manifest file found, skip assets update.");
                        that.clickMeShowTempLayer();
                        break;
                    case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                        cc.log(event.getPercent() + "%");
                        break;
                    case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                    case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                        cc.log("Fail to download manifest file, update skipped.");
                        that.clickMeShowTempLayer();
                        break;
                    case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                    case jsb.EventAssetsManager.UPDATE_FINISHED:
                        cc.log("Update finished. " + event.getMessage());
                        require(tempJSFileName);
                        that.clickMeShowTempLayer();
                        break;
                    case jsb.EventAssetsManager.UPDATE_FAILED:
                        cc.log("Update failed. " + event.getMessage());
                        break;
                    case jsb.EventAssetsManager.ERROR_UPDATING:
                        cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
                        break;
                    case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                        cc.log(event.getMessage());
                        break;
                    default:
                        break;
                }
            });
            cc.eventManager.addListener(listener, 1);
            this._am.update();
        }
    },
    clickMeShowTempLayer:function () {
        this.removeChildByTag(233, true);
        this._tempLayer = new ScriptTestTempLayer();
        this.addChild(this._tempLayer, 0, 233);
    },
    clickMeReloadTempLayer:function(){
        cc.sys.cleanScript(tempJSFileName);
        if (!cc.sys.isNative)
        {
            this.clickMeShowTempLayer();
        }
        else
        {
            this.startDownload();
        }

    },
    onExit : function () {
        if (this._am)
        {
            this._am.release();
            this._am = null;
        }

        this._super();
    },
    ctor : function () {
        this._super();

        var menu = new cc.Menu();
        menu.setPosition(cc.p(0, 0));
        menu.width = winSize.width;
        menu.height = winSize.height;
        this.addChild(menu, 1);
        var item1 = new cc.MenuItemLabel(new cc.LabelTTF("Click me show tempLayer", "Arial", 22), this.clickMeShowTempLayer, this);
        menu.addChild(item1);

        var item2 = new cc.MenuItemLabel(new cc.LabelTTF("Click me reload tempLayer", "Arial", 22), this.clickMeReloadTempLayer, this);
        menu.addChild(item2);

        menu.alignItemsVerticallyWithPadding(8);
        menu.setPosition(cc.pAdd(cc.visibleRect.left, cc.p(+180, 0)));
    },

    getTitle : function() {
        return "ScriptTest only used in native";
    }

});

//------------------------------------------------------------------
//
// Restart game test
//
//------------------------------------------------------------------
var RestartGameLayerTest = SysTestBase.extend({
    getTitle : function() {
        return "RestartGameTest only used in native";
    },
    restartGame:function()
    {
        cc.game.restart();
    },
    ctor : function () {
        this._super();
        var menu = new cc.Menu();
        menu.setPosition(cc.p(0, 0));
        menu.width = winSize.width;
        menu.height = winSize.height;
        this.addChild(menu, 1);
        var item1 = new cc.MenuItemLabel(new cc.LabelTTF("restartGame", "Arial", 22), this.restartGame, this);
        menu.addChild(item1);
        menu.setPosition(cc.pAdd(cc.visibleRect.left, cc.p(+180, 0)));
    }
});

// test by jl

var createSpr = cc.Sprite.extend({
    ctor:function(res,x,y,name){
        this._super(res);
        this.setPosition(x, y);
        this.name = name;


        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
    },
    onTouchBegan:function(touch, event){
        var target = event.getCurrentTarget();
        var pos = touch.getLocation();
        var locationInNode = target.convertToNodeSpace(pos);
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);
        if(cc.rectContainsPoint(rect, locationInNode)){
            return true;
        }
        return false;
    },
    onTouchMoved:function(touch, event){
        var target = event.getCurrentTarget();
        var pos = touch.getLocation();
        var locationInNode = target.convertToNodeSpace(pos);
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);
        if(cc.rectContainsPoint(rect, locationInNode)){
            target.x = pos.x;
            target.y = pos.y;
        }
    },
    onTouchEnded:function(touch, event){

    }
});

var SpriteUserDefineSceneTest = SysTestBase.extend({
    getTitle : function() {
        return "SpriteUserDefineSceneTest";
    },
    restartGame:function()
    {

    },
    ctor : function () {
        this._super();
        if(true){
            for(var i=0;i<3;i++){
                var sprObj = new createSpr("res/Images/CyanSquare.png",300,100 + i * 100,i);
                this.addChild(sprObj)
            }
        }
    }
});

var OrbitCameraSceneTest = SysTestBase.extend({
    getTitle : function() {
        return "OrbitCameraSceneTest";
    },
    showAnim:function(){
        var inAngleZ = 270;  //这里是一个起始Z轴角度，你要实现翻转角度通过这个参数来设置
        var inDeltaZ = 90;    // 旋转的Z角差
        var outDeltaZ = 90; //这里跟上面一样的
        var outAngleZ = 0;
        var duration = 3;//旋转的时间

        var halfDuration = duration/2;
        var outA = new cc.OrbitCamera(halfDuration, 1, 0, inAngleZ, inDeltaZ, 0, 0);

        var spr = new cc.Sprite(s_pathB1);
        spr.x = 400;
        spr.y = 300;
        this.addChild(spr);
        spr.runAction(outA.repeatForever());
    },

    ctor : function () {
        this._super();

        this.showAnim();
    }
});

// end test by jl

//
// Flow control
//

var arrayOfSysTest = [
    OrbitCameraSceneTest,
    SpriteUserDefineSceneTest,
    LocalStorageTest,
    CapabilitiesTest
];

if (cc.sys.isNative && cc.sys.OS_WINDOWS != cc.sys.os) {
    arrayOfSysTest.push(ScriptTestLayer);
    arrayOfSysTest.push(RestartGameLayerTest);
}

var nextSysTest = function () {
    sysTestSceneIdx++;
    sysTestSceneIdx = sysTestSceneIdx % arrayOfSysTest.length;

    return new arrayOfSysTest[sysTestSceneIdx]();
};
var previousSysTest = function () {
    sysTestSceneIdx--;
    if (sysTestSceneIdx < 0)
        sysTestSceneIdx += arrayOfSysTest.length;

    return new arrayOfSysTest[sysTestSceneIdx]();
};
var restartSysTest = function () {
    return new arrayOfSysTest[sysTestSceneIdx]();
};

