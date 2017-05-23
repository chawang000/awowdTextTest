var isMobile;
$(window).on("load", function (){
    checkIsMobile();
});

$(window).resize(function(){
    checkIsMobile();
});

function checkIsMobile(){
    if($(window).width() < 768) {
        isMobile = true;
        console.log('mobile device');
    }else{
        isMobile = false;
        console.log('web');  
    }
}

