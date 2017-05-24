var isMobile;
$(document).ready(function(){
    checkIsMobile();
    /* init - you can init any event */
    throttle("resize", "optimizedResize");

});

$(window).resize(function(){
    checkIsMobile();
});

function checkIsMobile(){
    if($(window).width() < 768) {
        isMobile = true;
        // console.log('mobile device');
    }else{
        isMobile = false;
        // console.log('web');  
    }
}

var throttle = function(type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function() {
        if (running) { return; }
        running = true;
         requestAnimationFrame(function() {
            obj.dispatchEvent(new CustomEvent(name));
            running = false;
        });
    };
    obj.addEventListener(type, func);
};


