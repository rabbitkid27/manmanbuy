//常规写法 
// 入口函数
// $(function () {
//     // 1.页面完成后先加载一次,把标题渲染出来
//     getCategoryTitle();
//     // 2,发ajax请求加载内容数据,把内容添加到页面
//     $('.mui-table-view').on('tap', '.mui-navigate-right', function () {
//         var titleid = $(this).data('titleid');
//         console.log(titleid);
//         $.ajax({
//             url: 'http://localhost:9090/api/getcategory',
//             data: {
//                 'titleid': titleid
//             },
//             success: function (data) {
//                 // console.log(data);
//                 var html = template('categoryTmp', data);
//                 $('.row').html(html);

//             }
//         })
//     })
//     // 获取标题函数
//     function getCategoryTitle() {
//         $.ajax({
//             url: 'http://localhost:9090/api/getcategorytitle',
//             success: function (data) {
//                 // console.log(data);
//                 var html = template('categoryTitleTmp', data);
//                 $('.mui-table-view').html(html);

//             }
//         })
//     }
// })

// 面向对象写法方法
// 先写一个入口函数
$(function(){

//实例化一个对象
var manmanbuy=new Manmanbuy();
//调用构造函数原型里的方法
manmanbuy.getCategoryTitle();
manmanbuy.getCategoryContent();    
})
// 写一个构造函数
var Manmanbuy=function(){
};
//往原型里添加方法
Manmanbuy.prototype={

    getCategoryTitle:function(){
        $.ajax({
            url: 'http://localhost:9090/api/getcategorytitle',
            success: function (data) {
                // console.log(data);
                var html = template('categoryTitleTmp', data);
                $('.mui-table-view').html(html);

            }
        })

    },

    getCategoryContent:function(){
            // 2,发ajax请求加载内容数据,把内容添加到页面
    $('.mui-table-view').on('tap', '.mui-navigate-right', function () {
        var titleid = $(this).data('titleid');
        console.log(titleid);
        $.ajax({
            url: 'http://localhost:9090/api/getcategory',
            data: {
                'titleid': titleid
            },
            success: function (data) {
                // console.log(data);
                var html = template('categoryTmp', data);
                $('.row').html(html);

            }
        })
    })
    }


}