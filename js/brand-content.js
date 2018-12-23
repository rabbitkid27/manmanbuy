$ ( function () {

    var brandContent = new BrandContent ();
    brandContent.brandtitleid = brandContent.getQueryString ( "brandtitleid" );
    brandContent.getSort ();
    brandContent.getSales ();
    brandContent.backTop ();



} );

//定义一个构造函数
var BrandContent = function () {

};

BrandContent.prototype = {

    baseURL:'http://localhost:9090',

    //十大品牌排行
    getSort : function () {
        var that = this;

        $.ajax ( {
            url : that.baseURL+"/api/getbrand",
            data : { brandtitleid : that.brandtitleid },
            success : function ( data ) {

                var arr = data.result;
                //按销量处理数据
                for ( var i = 0 ; i < arr.length - 1 ; i ++ ) {//1.外层循环决定比较的轮数
                    for ( var j = 0 ; j < arr.length - 1 - i ; j ++ ) {//2.内层循环决定每一轮比较的次数

                        var str1 = arr[ j ].brandInfo.match ( /\d+/g )[ 1 ];
                        var str2 = arr[ j + 1 ].brandInfo.match ( /\d+/g )[ 1 ];

                        if ( str1 < str2 ) {//3.交换相邻元素：比较两个相邻数字的大小
                            var temp = arr[ j ];
                            arr[ j ] = arr[ j + 1 ];
                            arr[ j + 1 ] = temp;
                        }
                    }
                }

                var html = template ( "brandContentTpl", data );
                $ ( ".brand-ul" ).html ( html );





                //初始化区域滑动
                mui ( ".mui-scroll-wrapper" ).scroll ( {
                    deceleration : 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                } );

            }

        } );
    },

    //商品销量排行
    getSales : function () {
        var that = this;
        $.ajax ( {
            url : that.baseURL+"/api/getbrandproductlist",
            data : { brandtitleid : that.brandtitleid, pagesize : 4 },
            success : function ( data ) {

                var html = template ( "brandProductlistTpl", data );

                if ( data.result.length > 0 ) {
                    $ ( ".brand-content2 .prolist  ul" ).html ( html );
                }


                var productObj = data.result[ 0 ];

                // 商品评论
                $.ajax ( {
                    url : "http://localhost:9090/api/getproductcom",
                    data : { productid : productObj.productId },
                    success : function ( data ) {

                        data.productObj = productObj;

                        var html = template ( "productComTpl", data );

                        $ ( ".conUl" ).html ( html );

                    }
                } );

            }
        } );
    },

    //返回顶部
    backTop : function () {
        $ ( ".backTop" ).on ( "tap", function () {
            mui ( ".mui-scroll-wrapper" ).scroll ().scrollTo ( 0, 0, 100 );//100毫秒滚动到顶

        } );
    }, //获取url参数
    getQueryString : function ( name ) {
        var reg = new RegExp ( "(^|&)" + name + "=([^&]*)(&|$)", "i" );
        var r = window.location.search.substr ( 1 ).match ( reg );
        // console.log ( r );
        if ( r != null ) {
            //转码方式改成 decodeURI
            return decodeURI ( r[ 2 ] );
        }
        return null;
    }

};









