
//写js用zepto,不用jq，做好写成面向对象的写法
$ ( function () {
    $.ajax({
        url:'http://localhost:9090/api/getsitenav',
        success:function (data) {  
            console.log(data);
            var html = template('sitenavTpl',data);
            $('#sitenavLink').html(html);
        },
        complete:function(){
            //在请求成功之后调用。传入返回的数据以及‘dataType’参数的值。并且必须返回新的数据传递给success的回调函数
            // $('#sitenavLink a').css("opacity","1");
            $('#sitenavLink a').fadeIn(1500);
            
            console.log(111);
            
        }
    });


} );