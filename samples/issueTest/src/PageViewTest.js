
var PageViewLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();


        var pageView = ccui.PageView.create();
        pageView.setTouchEnabled(true);
        pageView.setSize(cc.size(480, 854));
        pageView.x=0;
        pageView.y=0;

        for (var i = 0; i < 3; ++i) {
            var layout = ccui.Layout.create();
            layout.setSize(cc.size(480, 854));
            var layoutRect = layout.getContentSize();
            var spriteTemp = new cc.Sprite(res.HelloWorld_png);
            //spriteTemp.setContentSize(cc.size(480, 854));
            spriteTemp.setAnchorPoint(0, 0);
            layout.addChild(spriteTemp);

            var text = new ccui.Text();
            text.string = "page" + (i + 1);
            text.font = "30px 'Marker Felt'";
            text.color = cc.color(192, 192, 192);
            text.x = layoutRect.width / 2;
            text.y = layoutRect.height / 2;
            layout.addChild(text);




            // var  scrollView = ccui.ScrollView.create();
            // scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
            // scrollView.setTouchEnabled(true);
            // scrollView.setSize(cc.size(480, 854));
            // scrollView.inertiaScrollEnabled=false;

            

            // /////////////////////////////
            // // 2. add a menu item with "X" image, which is clicked to quit the program
            // //    you may modify it.
            // // ask the window size
            // var size = cc.winSize;

            // // add a "close" icon to exit the progress. it's an autorelease object
            // var closeItem = new cc.MenuItemImage(
            //     res.CloseNormal_png,
            //     res.CloseSelected_png,
            //     function () {
            //         cc.log("Menu is clicked!");
            //     }, this);
            // closeItem.attr({
            //     x: size.width - 20,
            //     y: 20,
            //     anchorX: 0.5,
            //     anchorY: 0.5
            // });

            // var menu = new cc.Menu(closeItem);
            // menu.x = 0;
            // menu.y = 0;

            // var innerWidth = scrollView.width;
            // var innerHeight =  menu.height;

            // scrollView.setInnerContainerSize(cc.size(innerWidth, innerHeight));

            // scrollView.addChild(menu);

            // //menu.touchEnabled=false;

            // layout.addChild(scrollView);

            pageView.addPage(layout);
        }

        this.addChild(pageView);

        return true;
    }
});

var PageViewScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PageViewLayer();
        this.addChild(layer);
    }
});

