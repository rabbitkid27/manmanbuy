$(function(){

    // 创建一个Manmanbuy实例对象
    var manmanbuy = new Manmanbuy();
    //拿到分类id
    // var categoryId = manmanbuy.getQueryString('categoryId');
    // console.log(manmanbuy.getQueryString('categoryId'));

    //依次调用功能
    manmanbuy.getcategorybyid();
    manmanbuy.getProductList();
    manmanbuy.pullDownUpRefresh();
    manmanbuy.searchClick();
    manmanbuy.priceSort();
    manmanbuy.productClick();
    manmanbuy.returnTop();
    manmanbuy.getQueryString();

   
 

})

//创建一个构造函数
var Manmanbuy = function(){

}
//给Manmanbuy函数的原型添加方法
Manmanbuy.prototype = {

    // 定义一些公共的属性
    categoryId : 0,  
    categoryName : '',
    page : 1,

   //根据分类id获取分类名称
    getcategorybyid : function(){
        // 发送请求-根据分类id获取分类名称
        var that=this;
        that.categoryId = that.getQueryString('categoryId');
        console.log(that.categoryId);
        
        $.ajax({
            url: 'http://localhost:9090/api/getcategorybyid',
            data: {categoryid : that.categoryId},
            success: function(obj){
                console.log(obj);
                //将获取的分类名称显示到导航中
                $('.nav-link a.active span').html(obj.result[0].category);
                console.log(obj.result[0].category);
                categoryName = obj.result[0].category;
                // console.log(categoryName);
            }
        })
    },
    //获取商品列表的请求封装起来
    getProductList : function(){
        var that = this;
        // 发送获取商品列表的请求
        $.ajax({
            url: 'http://localhost:9090/api/getproductlist',
            data: { categoryid : that.categoryId, pageid : 1},
            success: function(obj){

                //把价格前面的 ¥ 去掉
                $(obj.result).each(function(index,ele){
                    ele.productPrice = ele.productPrice.substr(1);
                })
                console.log(obj);
                //调用模板，渲染到页面
                var html = template('getProductListTpl',obj);
                $('.product-list').html(html);

                
            }

        })
    },
    // 初始化下拉刷新 和 上拉加载
    pullDownUpRefresh : function(){
        var that = this;
        mui.init({
            pullRefresh : {
              container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
              //下拉刷新
              down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: false,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉试一试哟😄",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新哟🐶",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新哟🏃‍🏃🌸😁😁🌼...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback : function(){
                    //下拉一松手就会执行的回调函数  定时器模拟网络延时
                    setTimeout(function(){
                        //发送获取商品列表的请求，刷新最新数据
                        that.getProductList();
                        //结束下拉刷新
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        //重置上拉加载
                        mui('#refreshContainer').pullRefresh().refresh(true);
                        //重置page  每次上拉刷新 都应该把页数改成第一页
                        that.page = 1;
    
                    },1000);
                }
              },
              //上拉加载
              up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在死命加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'在下实在没有数据了😭😭',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback : function(){
                    //上拉一松手就会执行的回调函数，下载页数++的数据，追加到页面  定时器模拟延时
                    setTimeout(function(){
                        //页数++
                        that.age++;
                        //发送请求page++的数据
                        $.ajax({
                            url: 'http://localhost:9090/api/getproductlist',
                            data: { categoryid :that.categoryId, pageid : that.page},
                            success: function(obj){
                                //把价格前面的 ¥ 去掉
                                $(obj.result).each(function(index,ele){
                                    ele.productPrice = ele.productPrice.substr(1);
                                })
                                console.log(obj);
                                //调用模板，渲染到页面
                                var html = template('getProductListTpl',obj);
                                $('.product-list').append(html);
                                //判断是否还有数据，有数据结束上拉加载时写一个参数false，没数据了写true
                                if(obj.result > 0){
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                                }else {
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                }
                                
                            }
                        })
                        
    
                    },1000);
                    
                }
              }
            }
        });
    },
    // 搜索按钮点击事件
    searchClick : function(){
        //点击搜索按钮
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
    //给价格排序按钮添加点击事件
    priceSort : function(){
        var that = this;
        //如果是向下箭头(down)，降序排序，发起请求，把价格遍历，从大到小进行排序，再渲染到页面，将向下改成向上(up)，同理
        $('.btn-priceSort').on('tap',function(){
            // 颜色变红
            $(this).css('color','#f00');
            //获取自定义属性data-sort的值
            var sort = $(this).data('sort');
            //发请求
            $.ajax({
                url: 'http://localhost:9090/api/getproductlist',
                data: { categoryid : that.categoryId, pageid : 1},
                success: function(obj){

                    //把价格前面的 ¥ 去掉
                    $(obj.result).each(function(index,ele){
                        ele.productPrice = ele.productPrice.substr(1);
                    })

                    //遍历result数组，根据价格进行排序
                    var result = obj.result;
                    for(var i=0; i < result.length; i++){
                        for(var j=0; j < result.length - 1 - i; j++){
                            // 根据sort来决定是升序还是降序
                            var sortOrder = (sort == 'down') ? (result[j].productPrice - 0) < result[j+1].productPrice : (result[j].productPrice-0) > result[j+1].productPrice;
                            if(sortOrder){
                                var temp = result[j];
                                result[j] = result[j+1];
                                result[j+1] = temp;
                            }
                        }
                    }
                    obj.result = result;
                    console.log(obj);
                    //调用模板，将排序后的数据渲染到页面
                    var html = template('getProductListTpl',obj);
                    $('.product-list').html(html);
                }

            })

            //值改变 和 箭头改变（改类名）
            if(sort == 'down'){
                sort = 'up';
                $(this).data('sort',sort);
                $(this).removeClass('fa-arrow-down').addClass('fa-arrow-up');
            }else {
                sort = 'down';
                $(this).data('sort',sort);
                $(this).removeClass('fa-arrow-up').addClass('fa-arrow-down');
            }

        })
    },
    //给每项商品添加点击事件
    productClick : function(){
        var that = this;
        $('.product-list').on('tap','li',function(){
            // 获取当前点击的商品id 和 商品品牌
            var productId = $(this).data('id');
            var brandName = $(this).data('brand');
            // console.log(productId);
            // 跳转到详情页  
            location = 'detail.html?productId=' + productId + '&categoryId=' + that.categoryId + '&brandName=' + brandName + '&categoryName=' + categoryName;
        })
    },
    //给返回顶部添加点击事件
    returnTop : function(){
        $('.returnTop').on('tap',function(){
            // 把区域滚动的子盒子位移恢复到0，就到了最开始的位置
            //这是自己的方法，出现bug是，回到顶部后，再点一下又瞬间回到底部了
            // $('.mui-scroll').css({
            //     'transform' : 'translate3d(0px, 0px, 0px)',
            //     'transition' : 'all .3s'
            // });
            //所以调用mui的方法
            mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,300);//300毫秒滚动到顶
            $('.mui-scrollbar-indicator').css('transform' , 'translate3d(0px, 0px, 0px)');
        })
    },
    // 根据url参数名获取参数值 
    getQueryString : function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        console.log(r);
        if (r != null) {
            //转码方式改成 decodeURI
            return decodeURI(r[2]);
        }
        return null;
    }


}