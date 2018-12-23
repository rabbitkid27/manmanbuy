$(function(){


    // 搜索框显示和隐藏
    $('#main .search-icon').on('tap',function(){
        $('#main .search-box').toggle();
    })
    // 搜索框取消图标
    $('#main .del').on('tap',function(){
        $('#main input').val("")
    })
    // 回到顶部图标
    $(window).scroll(function(){
        if($(window).scrollTop()>$(window).height()){
            $('.backTop').show();
        }else{
            $('.backTop').hide();
        }
        
        
    });
    // 回到顶部按钮
    $('.backTop').on('tap',function(){
        mui.scrollTo(0,300);
    })


    // 初始化加载页面
    productlist(0)


    // 导航栏数据
    $.ajax({
        url:"http://localhost:9090/api/getbaicaijiatitle",
        success:function(data){
            console.log(data);
            var html = template('navTpl',data);
            console.log(html);
            $('#main .mui-scroll').html(html);
            
        }
    })
    
    $('#main .mui-scroll').on('tap','.nav-name',function(){
        // $(this).addClass('mui-active').siblings().removeClass('mui-active')
        var id = $(this).data('id');
        console.log(id);
        // 商品内容数据
        
        productlist(id);  
    })
    productlist(0)
    // 封装商品内容数据
    function productlist (id) {
        $.ajax({
            url:'http://localhost:9090/api/getbaicaijiaproduct',
            
            data:{ titleid:id },
            success:function(data){
                // console.log(data);

                var html = template('productTpl',data);
                // console.log(html);
                
                $('#main .product .content').html(html);
            }
        })
    }


    
})