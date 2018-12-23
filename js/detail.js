$(function(){

    // 创建一个Manmanbuy实例对象
    var manmanbuy = new Manmanbuy();

    //依次调用功能
    manmanbuy.showNav();  //显示二级、三级导航
    manmanbuy.getProduct();  //获取商品详情
    manmanbuy.areaScroll();  //初始化区域滚动
    manmanbuy.getproductcom();  //获取商品评价
    manmanbuy.searchClick();  //搜素按钮点击事件
    manmanbuy.secondNav();  //二级导航点击事件
    manmanbuy.returnTop();  //返回顶部
    manmanbuy.getQueryString();  //根据url参数名获取参数值

 

})

// 创建一个构造函数
var Manmanbuy = function(){

}
//往Manmanbuy构造函数的原型里添加公共的属性和方法
Manmanbuy.prototype = {

    productId : 0,  //商品id
    categoryName : 0, //分类名称
    brandName : '小米',  //商品品牌
    categoryId : 0,  //分类id

    // 将分类名称和商品品牌 分别显示到二级、三级导航
    showNav : function(){

        this.categoryName = this.getQueryString('categoryName');
        this.brandName = this.getQueryString('brandName');

        $('.nav-link a').eq(1).find('span').html(this.categoryName);
        $('.nav-link a').eq(2).find('span').html(this.brandName);
    },
    // 发送请求-根据商品id获取商品详情
    getProduct : function(){
        var that = this;
        that.productId = that.getQueryString('productId');
        $.ajax({
            url: 'http://localhost:9090/api/getproduct',
            data: {productid : that.productId},
            success: function(obj){
                console.log(obj);
                //调用模板，渲染到页面
                var html = template('getProductTpl',obj);
                $('.detail-head').html(html);
                //将商城报价的标签放到页面中
                $('.tab-con .mall-sales').html(obj.result[0].bjShop);
            }
        })
    },
    // 发送请求-根据商品id获取商品评论
    getproductcom : function(){
        var that = this;
        that.productId = that.getQueryString('productId');
        $.ajax({
            url: 'http://localhost:9090/api/getproductcom',
            data: {productid : that.productId},
            success: function(obj){
                console.log(obj);
                //调用模板，渲染到页面
                var html = template('getProductComTpl',obj);
                $('.net-comments ul').html(html);
            }
        })
    },
    //点击搜索按钮
    searchClick : function(){
        $('.btn-search').on('tap',function(){
            var search = $('.input-search').val();
            //非空判断
            if(!search){
                mui.alert( '亲😘请输入商品名称🌹', '温馨提示', '好的👌', function(){
    
                } );
                return false;
            }
            location = 'category.html';
        })
    },
    // 点击二级导航，回到上一级商品列表页
    secondNav : function(){
        var that = this;
        that.categoryId = that.getQueryString('categoryId');
        $('.nav-link a').eq(1).on('tap',function(){
            $(this).addClass('active'); //文字变红色
            //回到上一级导航，商品列表页
            location = 'productList.html?categoryId=' + that.categoryId;
        })    
    },
    //初始化区域滚动
    areaScroll : function(){
        mui('.mui-scroll-wrapper').scroll({
            indicators: false, //是否显示滚动条
            bounce: false, //是否回弹
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    // 点击返回顶部事件
    returnTop : function(){
        $('.returnTop').on('tap',function(){
            // $(window).scrollTop(0);  //这是zepto的方法
            // window.scrollTo(0,0);  //这是原生js的方法
            //这是借用了MUI里面区域滚动回到该区域顶部的方法，其实就是将子盒子位移translate到 0
            mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,300);//100毫秒滚动到顶
            
        })
    },
    // 根据url参数名获取参数值 
    getQueryString : function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        // console.log(r);
        if (r != null) {
            //转码方式改成 decodeURI
            return decodeURI(r[2]);
        }
        return null;
    }



}