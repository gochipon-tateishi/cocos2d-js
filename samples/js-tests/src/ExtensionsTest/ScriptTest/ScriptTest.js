/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

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

var sceneIdx = -1;

var ScriptTestDemo = BaseTestLayer.extend({
    _title:"",
    _subtitle:"",

    ctor:function () {
        this._super.apply(this, arguments);
    },

    onRestartCallback:function (sender) {
        var s = new ScriptTestScene();
        s.addChild(restartScriptTest());
        director.runScene(s);
    },

    onNextCallback:function (sender) {
        var s = new ScriptTestScene();
        s.addChild(nextScriptTest());
        director.runScene(s);
    },

    onBackCallback:function (sender) {
        var s = new ScriptTestScene();
        s.addChild(previousScriptTest());
        director.runScene(s);
    },

    // automation
    numberOfPendingTests:function () {
        return ( (arrayOfScriptTest.length - 1) - sceneIdx );
    },

    getTestNumber:function () {
        return sceneIdx;
    }
});

var ScriptTestLayer = ScriptTestDemo.extend({
    _tempLayer:null,
    clickMeShowTempLayer:function () {
        if (this._tempLayer != null)
        {
            this._tempLayer.removeFromParent();
        }
        this._tempLayer = new ScriptTestTempLayer();
        this.addChild(this._tempLayer);
    },
    clickMeReloadTempLayer:function(){
        cc.sys.cleanScript("ScriptTestTempFile.js");
        // insert from the sdcard
        // to do
        if (cc.sys.os == cc.sys.OS_ANDROID)
        {
            jsb.fileUtils.addSearchPath("/mnt/sdcard/newScript", true);
            require("ScriptTestTempFile.js");
        }

        this.clickMeShowTempLayer();
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
        return "ScriptTest";
    }

});

var RestartGameLayerTest = ScriptTestDemo.extend({
    getTitle : function() {
        return "RestartGameTest";
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

var ScriptTestScene = TestScene.extend({
    runThisTest : function (num) {
        sceneIdx = (num || num == 0) ? (num - 1) : -1;
        var layer = nextScriptTest();
        // var menu = new EventTest();
        // menu.addKeyboardNotificationLayer( layer );

        this.addChild(layer);
        director.runScene(this);
    }
});

//
// Flow control
//
var arrayOfScriptTest = [
    ScriptTestLayer,
    RestartGameLayerTest
];

var nextScriptTest = function () {
    sceneIdx++;
    sceneIdx = sceneIdx % arrayOfScriptTest.length;

    if(window.sideIndexBar){
        sceneIdx = window.sideIndexBar.changeTest(sceneIdx, 12);
    }

    return new arrayOfScriptTest[sceneIdx]();
};
var previousScriptTest = function () {
    sceneIdx--;
    if (sceneIdx < 0)
        sceneIdx += arrayOfScriptTest.length;

    if(window.sideIndexBar){
        sceneIdx = window.sideIndexBar.changeTest(sceneIdx, 12);
    }

    return new arrayOfScriptTest[sceneIdx]();
};
var restartScriptTest = function () {
    return new arrayOfScriptTest[sceneIdx]();
};