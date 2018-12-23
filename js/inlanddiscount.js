// 这是处理国内折扣的js代码的逻辑页面

//写js用zepto,不用jq，做好写成面向对象的写法
$.ajax({
    type: "get",
    url:"http://localhost:9090/api/getinlanddiscount",
    data: {},
    success: function (t) {
        var o = template("productList", t);
        $(".content-ul").html(o)
    }
});
var count = 0;

function c() {
    ///
    $(".loading").css({
        WebkitTransform: "scale(0.5) rotate(" + count + "deg)",
        MozTransform: "scale(0.5) rotate(" + count + "deg)"
    }), 360 == count && (count = 0), count += 45, window.setTimeout(rotate, 100)
}
// window.setTimeout(rotate, 10);