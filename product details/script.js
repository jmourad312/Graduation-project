//tooltip
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

$(function(){
    $(".tabs li").click(function(){
        var id = $(this).attr("id");
        $(this).addClass("active").siblings().removeClass("active")
        for(let i=1;i<=3;i++){
            $(".content .tab"+i+"content").removeClass("show");
            $(".content .tab"+i+"content").addClass("hide");
        }
        $(".content ."+id+"content").addClass("show")
    });
})