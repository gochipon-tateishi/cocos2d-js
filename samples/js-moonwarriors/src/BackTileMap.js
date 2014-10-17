define(["require", "core", "Sprite", "game/config/GameConfig"], function(require, cc, Sprite, MW) {
    var GameLayer = null;
    var BackTileMapLvl1 = [
        "lvl1_map1.png",
        "lvl1_map2.png",
        "lvl1_map3.png",
        "lvl1_map4.png"
    ];

    var BackTileMap = Sprite.extend({
        active:true,
        ctor:function (frameName) {
            this._super("#"+frameName);
            this.anchorX = 0.5;
            this.anchorY = 0;
        },
        destroy:function () {
            this.visible = false;
            this.active = false;
        }
    });

    BackTileMap.create = function (frameName) {
        var backTileMap = new BackTileMap(frameName);
        GameLayer.sharedGameLayer.addChild(backTileMap, -9);
        MW.CONTAINER.BACKTILEMAPS.push(backTileMap);
        return backTileMap;
    };

    BackTileMap.getOrCreate = function () {
        var selChild = null;
        for (var j = 0; j < MW.CONTAINER.BACKTILEMAPS.length; j++) {
            selChild = MW.CONTAINER.BACKTILEMAPS[j];
            if (selChild.active == false) {
                selChild.visible = true;
                selChild.active = true;
                return selChild;
            }
        }
        selChild = BackTileMap.create(BackTileMapLvl1[0|Math.random()*4]);
        return selChild;
    };


    BackTileMap.preSet = function (gameLayer) {
        GameLayer = gameLayer
        var backTileMap = null;
        for (var i = 0; i < BackTileMapLvl1.length; i++) {
            backTileMap = BackTileMap.create(BackTileMapLvl1[i]);
            backTileMap.visible = false;
            backTileMap.active = false;
        }
    };

    return BackTileMap;
});