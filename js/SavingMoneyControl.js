$(function(){

    queryGoods();
    var pageid=1;

/*
一 . 下拉刷新和上拉加载goods页面
1.添加下拉上拉结构
2.初始化下拉刷新和上啦加载
3.在下拉刷新的函数请求最新的数据
4.结束下拉刷新的效果(不结束会一直转)
5.定义一个page=1;
6.上啦加载的回调函数让page++
7.请求page++了之后的更多数据
8.追加append到购物车的列表
9.结束上啦加载效果
10.判断如果没有数据的时候结束并且提示没有数据了,调用结束上啦加载效果传递一个true
11.下拉结束后充值上拉加载的效果
12.把page也要重置为1
*/
// 1.添加下拉上拉结构
// var productid=0;
mui.init({
    pullRefresh : {
      container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        height:50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown : "下拉出屎就能刷那个新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover : "释放立即刷了个新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh : "正在拉屎",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback :function(){
            queryGoods();
            // 在下拉刷新的函数请求最新的数据
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
            // 11. 下拉结束后重置上拉加载的效果
            mui('#refreshContainer').pullRefresh().refresh(true);
            // 12. 把page也要重置为1
            pageid=1;
        }
      },
    //   初始化上啦
      up:{
          callback:function(){
            pageid++;
            $.ajax({
                url: "http://localhost:9090/api/getmoneyctrl",
                data: {pageid:pageid},
                success: function (data) {
                    
                    // productid=data.
                    // console.log(data);
                    console.log(data.result.length);
                    if(data.result.length >0){
                        // 调用模板方法生成HTML
                        var html =template('moneyCtrlTpl',data);
                        $('.goods-list').append(html);
                         // 9. 结束上拉加载效果
                         mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                    } else {
                         // 10. 结束上拉加载效果提示没有数据了
                         mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                    }         
                }
            });
            // 以上是AJAX回调函数
          }
      }
    }
  });
    
//   把请求商品的函数封装起来
function queryGoods(){
    
    $.ajax({
        url: "http://localhost:9090/api/getmoneyctrl",
        data: {pageid:1},
        success: function (data) {
            var html =template('moneyCtrlTpl',data);
            $('.goods-list').html(html);

        }
    });
}

    //! 把动态生成的productid,用.attr或者.data 获取HTML属性的方法,来传动态的值ID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    $('#main').on('tap','.product-main',function(){     
        // 下面2个方法都一样
    //    var productid= $(this).attr("data-id");
        var productid =$(this).data('id');
        location='Domestic-sale.html?productid='+productid;
    });
});