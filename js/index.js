$(function () {
    var manmanbuy = new Manmanbuy();
    manmanbuy.menubar();
    manmanbuy.ontap();
    manmanbuy.shop();
    manmanbuy.initialize();

});

/*创建一个构造函数 */
var Manmanbuy = function () {

}

Manmanbuy.prototype = {
    /* 菜单栏 */
    menubar: function () {
        /* 调用api */
        $.ajax({

            url: "http://localhost:9090/api/getindexmenu",
            success: function (result) {
                console.log(result);
                var html = template('indexMenubarTpl', result);
                $('.menubar-top ul').html(html);
            }
        });
    },

    /* 点击更多显示更多菜单 */
    ontap: function () {

        var abClock = true;
        $('.menubar-top ul').on('tap', '.li7', function () {

            var ab = document.querySelector('.menubar-top');
            if (abClock) {

                $('.menubar-top').animate({
                    'height': '3rem'
                })

                abClock = !abClock;
            } else {

                $('.menubar-top').animate({
                    'height': '1.9rem'
                })
                abClock = !abClock;
            }

        })

    },

    /* 超值折扣和推荐的内容  */
    shop: function () {
        $.ajax({

            url: "http://localhost:9090/api/getmoneyctrl",

            success: function (result) {
                console.log(result);
                var html = template('indexshopContentTpl', result)
                $('.shop-content ul').html(html);
            }
        });

    },

    /* 初始化 */

    initialize: function () {
        /* 轮播图初始化 */
        mui('.mui-slider').slider({
            interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
        /*  滚动区域初始化 */
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            bounce: false //是否启用回弹
        });

        /* 点击返回顶部 */
        $('.my-goTop').on('tap', function () {
            mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 1000); //100毫秒滚动到顶
        });

    }


}