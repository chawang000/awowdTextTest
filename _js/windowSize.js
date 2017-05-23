var isMobile = false;

$(document).ready(function(){
    checkWindoWidth();
    $(window).resize(function(){
        checkWindoWidth();
    })
    // console.log(windowW);
});

function checkWindoWidth(){
    var windowW = $(window).width();
    if(windowW <= 768){
        isMobile = true;
        toMobileStyle();
    }else{
        isMobile = false;
        toWebStyle();
    }
    // console.log(isMobile);
}

function toMobileStyle(){
    $('html').css({
        'height': '100vh',
        'overflow': 'hidden'
    });

    $('body').css({
        'height': '100%',
        'overflow-y': 'scroll',
        '-webkit-overflow-scrolling': 'touch'
    });

    $('#mobileHeader').css('display','inherit');
    $('#webHeader').css('display','none');
    // console.log('mobile device');
}

function toWebStyle(){
    $('html').css({
        'height': 'auto',
        'overflow': 'visible'
    });

    $('body').css({
        'height': 'auto',
        'overflow-y': 'visible',
        '-webkit-overflow-scrolling': 'auto'
    });
    $('#mobileHeader').css('display','none');
    $('#webHeader').css('display','inherit');
    // console.log('web');
}


// $(window).on("load", function (){
//     if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//     // some code..
//     $('html').css({
//         'height': '100vh',
//         'overflow': 'hidden'
//     });

//     $('body').css({
//         'height': '100%',
//         'overflow-y': 'scroll',
//         '-webkit-overflow-scrolling': 'touch'
//     });

//     $('#mobileHeader').css('display','inherit');
//     $('#webHeader').css('display','none');
//     console.log('mobile device');
// }else{
//      $('html').css({
//         'height': 'auto',
//         'overflow': 'visible'
//     });

//     $('body').css({
//         'height': 'auto',
//         'overflow-y': 'visible',
//         '-webkit-overflow-scrolling': 'auto'
//     });
//     $('#mobileHeader').css('display','none');
//     $('#webHeader').css('display','inherit');
//     console.log('web');  
// }
// });

