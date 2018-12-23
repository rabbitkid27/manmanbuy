$ ( function () {

    //实例化对象
    var brand = new Brand ();
    brand.getMenu ();
    brand.toProductList ();
    brand.backTop ();

} );

//定义一个构造函数
var Brand = function () {


};

//定义原型上的方法
Brand.prototype = {
    baseURL:'http://localhost:9090',
    //渲染品牌列表
    getMenu : function () {
        var that = this;

        //渲染品牌一级列表
        $.ajax ( {
            url : that.baseURL+"/api/getbrandtitle", success : function ( data ) {
                var html = template ( "brand-one-Tpl", data );
                $ ( ".brand-content-ul" ).html ( html );


                //初始化区域滑动
                mui ( ".mui-scroll-wrapper" ).scroll ( {
                    deceleration : 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                } );
            }
        } );
    },

    //跳转到列表内容页
    toProductList : function () {
        $ ( ".brand-content-ul" ).on ( "tap", ".titleOne", function () {

            var id = $ ( this ).data ( "id" );
            console.log ( id );
            location = "brand-content.html?brandtitleid=" + id;

        } );

    },

    //返回顶部
    backTop : function () {

        $ ( ".backTop" ).on ( "tap", function () {
            mui ( ".mui-scroll-wrapper" ).scroll ().scrollTo ( 0, 0, 100 );//100毫秒滚动到顶

        } );
    }

};







