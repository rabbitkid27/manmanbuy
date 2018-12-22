// 分类区域开始
// 入口函数
$(function () {


    // 页面完成后先加载一次
    getCategoryTitle();

        // 获取标题函数
    function getCategoryTitle() {
        $.ajax({
            url: 'http://localhost:9090/api/getcategorytitle',
            success: function (data) {
                // console.log(data);
                var html = template('categoryTitleTmp', data);
                $('.mui-table-view').html(html);

            }
        })
    }
    

// 进入页面先请求加载内容数据,先把内容获取到来
    // var ul=document.querySelector('.mui-table-view')
    // console.log(ul);
    // ul.onclick=function(){
    //    console.log(11);
    // }

    $('.mui-table-view').on('tap','.mui-navigate-right',function(){
        var titleid = $(this).data('titleid');
        console.log(titleid);
        $.ajax({
            url: 'http://localhost:9090/api/getcategory',
            data: {
                'titleid': titleid
            },
            success: function (data) {
                // console.log(data);
                var html=template('categoryTmp',data);
                $('.row').html(html);
              
            }
        })
    })
   

  





// 标题点击出来内容
    // $('#category').on('.mui-navigate-right','click', function () {
    //     alert(11)
    //     var titleid = $(this).data('titleid');
    //     console.log(titleid);
    //     $.ajax({
    //         url: 'http://localhost:9090/api/getcategory',
    //         data: {
    //             'titleid': titleid
    //         },
    //         success: function (data) {
    //             console.log(data);
    //             var html = template('categoryTmp',data);
    //             $('.row').html(html);
    //         }
    //     })
    // })
})