//TODO headerStatesController() fix the bug that mobile menu can be scrolled after opening.



// MOBILE VAR
var headerCanShow = true,
	mobileMenuActived = false,
	mobileBookActived = false,
	mobileTransitioning = false,
	bodyLocked = false;



var mobileHeader = $('#mobileHeader'),
	mobileMenu = $('#mobileMenu'),
	mobileUpperHeader = $('#mobileUpperHeader'),
	mobileLowerHeader = $('#mobileLowerHeader'),
	mobileMenuDisplay = $('#mobileMenuDisplay'),
	mobileMenuContent = $('#mobileMenuContent'),
	mobileUpperLogo = $('#mobileUpperLogo'),
	menuLogo = $('#menuLogo'),
	mobileBurgerToggle = $('#mobileHeader .menu_icon'),
	mobileUpperClose = $('#mobileUpperClose'),//close button
	mobileCloseText = $('#mobileCloseText'),
	mobileUpperWrapper = $('#mobileUpperWrapper'),
	mobileBookLife = $('#mobileBookLife'),
	mobileBookDisplay = $('#mobileBookDisplay'),
	mobileBookLowerDisplay = $('#mobileBookLowerDisplay'),
	mobileBookContent = $('#mobileBookContent'),
	mobileEmailOuter = $('#mobileEmailOuter'),
	inputLeftWrapper= $('#inputLeftWrapper'),
	menuBookTitle = $('#menuBookTitle'),
	menuBookInputBox = $('#menuBookInputBox'),
	menuBookSendButton = $('#menuBookSendButton');
	


var mUpperHeight,
	mMenuHeight,
	mLowerHeight,
	mBookHeight,
	mBookTitleWidth,
	mBookInputBoxWidth,
	bodyScrollValue,
	lastScrollValue = 0,
	documentHeight,
	windowH,
	mHeaderOffset = 8;



// WEB VAR
var webTransitioning = false,
	webMenuActived = false,
	webBookActived = false,
	scrollUpSensitive = 30;

var webHeader = $('#webHeader'),
	webHeaderDisplay = $('#webHeaderDisplay'),
	webMenu = $('#webMenu'),
	webMenuDisplay = $('#webMenuDisplay'),
	webMenuContent = $('#webMenuContent'),
	webMenuInnerContent = $('#webMenuInnerContent'),
	webBookLifeDisplay = $('#webBookLifeDisplay'),
	webBookButton = $('#webBookButton'),
	webBurgerToggle = $('#webHeader .menu_icon');


var webMenuHeight;

// var menuMobileAdded = true;

$(document).ready(function(){
	window.addEventListener("optimizedResize", menuResizeSettings);
	if(isMobile){
		showMobileMenu();
		mobileMenuFunctions();
		webRemoveListener();
		mobileAddListener();
		// menuMobileAdded = true;
	}else{
		showWebMenu();
		webMenuFunctions();
		mobileRemoveListener();
		webAddListener();
		// menuMobileAdded = false;
	}
});

var menuResizeSettings = function(){
	if(isMobile){
		showMobileMenu();
		mobileMenuFunctions();
		webRemoveListener();
		mobileAddListener();
		// menuMobileAdded = true;
		// console.log('menuMobileAdded');
	}else if(!isMobile){
		showWebMenu();
		webMenuFunctions();
		mobileRemoveListener();
		webAddListener();
		// menuMobileAdded = false;
	}
}

var webAddListener = function(){
	window.addEventListener("scroll", webMenuScrollFunctions,false);
	window.addEventListener("touchmove", webMenuScrollFunctions,false);
}

var webRemoveListener = function(){
	window.removeEventListener("scroll", webMenuScrollFunctions,false);
	window.removeEventListener("touchmove", webMenuScrollFunctions,false);
}

var mobileAddListener = function(){
	$('body')[0].addEventListener("scroll", mobileMenuScrollFunctions,false);
	$('body')[0].addEventListener("touchmove", mobileMenuScrollFunctions,false);
}

var mobileRemoveListener = function(){
	$('body')[0].removeEventListener("scroll", mobileMenuScrollFunctions,false);
	$('body')[0].removeEventListener("touchmove", mobileMenuScrollFunctions,false);
}

$(window).resize(function(){
	});


var mobileMenuFunctions = function(){
	// MOBILE
	mobileHeaderSetter();
	mobileMenuToggle(mobileBurgerToggle);
	mobileBookToggle(menuBookTitle,mobileUpperClose,mobileBurgerToggle);
	mobileBookToggle(mobileEmailOuter,mobileUpperClose,mobileBurgerToggle);
	
	menuBookInputBox.find('input')[0].addEventListener("focus", bookFocusStyle);
	menuBookInputBox.find('input')[0].addEventListener("blur", bookBlurStyle);
}

var mobileMenuScrollFunctions = function(){
	headerStatesController(mobileHeader, (mUpperHeight + mLowerHeight));
}

var webMenuFunctions = function(){
	webHeaderSetter();
	webMenuToggle(webBurgerToggle);
}

var webMenuScrollFunctions = function(){
	headerStatesController(webHeader, webHeader.height());
}

var webResizeFunctions = function(){
	webHeaderSetter();
}

$(window).on("load", function (e){
	



	// WEB
	
	// drawCanvas();

	
	
	// webBookToggle(webBookButton);

});




function showWebMenu(){
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
}

function showMobileMenu(){
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
}

// function menuDisplaySetting(){
// 	if(isMobile) {
//         $('html').css({
//             'height': '100vh',
//             'overflow': 'hidden'
//         });

//         $('body').css({
//             'height': '100%',
//             'overflow-y': 'scroll',
//             '-webkit-overflow-scrolling': 'touch'
//         });

//         $('#mobileHeader').css('display','inherit');
//         $('#webHeader').css('display','none');
//         // console.log('mobile device')
//     }else{
//          $('html').css({
//             'height': 'auto',
//             'overflow': 'visible'
//         });

//         $('body').css({
//             'height': 'auto',
//             'overflow-y': 'visible',
//             '-webkit-overflow-scrolling': 'auto'
//         });
//         $('#mobileHeader').css('display','none');
//         $('#webHeader').css('display','inherit');
//         // console.log('web');
//     }
// }

// =========================================================================
// =========================================================================
// ===============================WEB MENU==================================
// =========================================================================
// =========================================================================
function webHeaderSetter(){
	windowH = $(window).height();
	documentHeight = $(document).height();
	webHeaderHeight = webHeaderDisplay.height();
	webMenuHeight = $(window).height() - webHeaderHeight;
	webMenuDisplay.css({
		'height':webMenuHeight + 'px'
	});
	// console.log(webMenuHeight);
	webMenuTextHeight = $('#webMenuInnerContent ul').height();
	webMenuInnerContent.css({
		'height':webMenuTextHeight+'px'
	});
	if(webMenuActived){
		webMenuDisplay.css({
			'transform':'translate(0px, ' + webMenuHeight + 'px)'
		});
		webMenuContent.css({
			'transform':'translate(0px, ' + -webMenuHeight + 'px)'
		});
	}
}

function webBookToggle(webBookButton){
	webBookButton.on({
	    'click': function(){
	    	var menuTransformDistance = webMenuHeight;
	        if(webMenuActived && !webTransitioning){
	        	// releaseScroll();
	        	// webMenuClose(webBurgerToggle);
	        }else if(!webBookActived && !webTransitioning){
	        	webBookOpen(menuTransformDistance);
	        }
	    }
	});
}

function webBookOpen(menuTransformDistance){
	// console.log('showing');
	webTransitioning = true;
	var element = webBookLifeDisplay[0];
	element.addEventListener("transitionend", transitionCallback, false);

	webBookShow(menuTransformDistance);
}


function webBookShow(menuTransformDistance){
	webMenuDisplay.css({
		'transform':'translate(0px, ' + menuTransformDistance + 'px)'
	});
	webBookLifeDisplay.css({
		'transform':'translate(0px, ' + -menuTransformDistance + 'px)'
	});
}


function webMenuToggle(webBurgerToggle){
	webBurgerToggle.on({
	    'click': function(){
	    	var menuTransformDistance = webMenuHeight;
	        if(webMenuActived && !webTransitioning){
	        	releaseScroll();
	        	webMenuClose(webBurgerToggle)
	        }else if(!webMenuActived && !webTransitioning){
	            webMenuOpen(webBurgerToggle,menuTransformDistance);
	        }
	    }
	});
}


function  webMenuOpen(webBurgerToggle,menuTransformDistance){
	webTransitioning = true;
	var element = webMenuContent[0];
	element.addEventListener("transitionend", transitionCallback, false);

	webBurgerToggle.addClass('active');
	
	webMenuShow(menuTransformDistance);
	function transitionCallback(){
		element.removeEventListener("transitionend", transitionCallback, false);
		webMenuActived = true;
		webTransitioning = false;
		lockScroll();
	}
}

function webMenuClose(webBurgerToggle){
	webTransitioning = true;
	var element = webMenuContent[0];
	element.addEventListener("transitionend", transitionCallback, false);

	webBurgerToggle.removeClass('active');
	webMenuLeave();

	function transitionCallback(){
		element.removeEventListener("transitionend", transitionCallback, false);
		webMenuActived = false;
		webTransitioning = false;
	}
}


function webMenuShow(menuTransformDistance){

	webMenuDisplay.css({
		'transform':'translate(0px, ' + menuTransformDistance + 'px)'
	});
	webMenuContent.css({
		'transform':'translate(0px, ' + -menuTransformDistance + 'px)'
	});
}

function webMenuLeave(){
	webMenuDisplay.css({
		'transform':'translate(0px, ' + 0 + 'px)'
	});
	webMenuContent.css({
		'transform':'translate(0px, ' + 0 + 'px)'
	});
}


// =========================================================================
// =========================================================================
// ===============================MOBILE MENU===============================
// =========================================================================
// =========================================================================
function headerStatesController(header, headerHeight){
	// var body = $('#main')[0];
	// var compare = body.getBoundingClientRect();
	if(isMobile){
		var currentWindowScroll = -$('#main')[0].getBoundingClientRect().top;
		scrollUpSensitive = scrollUpSensitive/2;
	}else{
		var currentWindowScroll = $(document).scrollTop();
	}
	
	// console.log(currentWindowScroll);
	// var currentWindowScroll = -$('#main')[0].getBoundingClientRect().top;
	// console.log(documentHeight);
	if(!mobileBookActived && !mobileMenuActived && !webMenuActived && currentWindowScroll > 300 && currentWindowScroll < (documentHeight-windowH-100)){
		if(currentWindowScroll > (lastScrollValue+scrollUpSensitive/3) && headerCanShow){
			header.css({
				'transform':'translate(0px,' + -headerHeight + 'px)',
				'transition':'transform 0.2s'
			});

			headerCanShow = false;
		}else if(currentWindowScroll < (lastScrollValue-scrollUpSensitive) && !headerCanShow){
			header.css({
				'transform':'translate(0px,' + 0 + 'px)',
				'transition':'transform 0.3s'
			});
			// console.log('after: '+$(window).height());
			headerCanShow = true;
		}
	}else if(!mobileBookActived && !mobileMenuActived && !webMenuActived && currentWindowScroll <= 300 && !headerCanShow){
		header.css({
			'transform':'translate(0px,' + 0 + 'px)',
			'transition':'transform 0.3s'
		});
		headerCanShow = true;
	}
	

	lastScrollValue = currentWindowScroll;
}



function bookFocusStyle(){
	mobileEmailOuter.css('border-color','#000');
	menuBookSendButton.css('opacity','1');
}

function bookBlurStyle(){
	mobileEmailOuter.css('border-color','#eee');
	menuBookSendButton.css('opacity','0.1');
}



// =========================================================================
// SETTING MOBILE MENU HEIGHT
// -------------------------------------------------------------------------
// * prevent scrolling background when the menu or book page is opening
// =========================================================================
function mobileHeaderSetter(){
	windowH = $(window).height();
	var mOutterWidth = mobileEmailOuter.width();
	var mEmailSendWidth = menuBookSendButton.width();
	mUpperHeight = parseInt(mobileUpperHeader.css('height'));
	mLowerHeight = parseInt(mobileLowerHeader.css('height'));
	mBookTitleWidth = parseInt(menuBookTitle.css('width')) + parseInt(menuBookTitle.css('padding-left'));
	mMenuHeight = windowH - mUpperHeight - mLowerHeight - mHeaderOffset;
	mBookHeight = windowH - mUpperHeight - mLowerHeight;
	mBookInputBoxWidth = parseInt(mOutterWidth - mEmailSendWidth - mBookTitleWidth);
	mobileMenuDisplay.css('height', mMenuHeight +'px');
	mobileBookDisplay.css('height', mBookHeight + 'px');
	menuBookInputBox.css('width', mBookInputBoxWidth + 'px');
	documentHeight = $('#main').height();
}

function resetMenuHeights(){
	windowH = $(window).height();
	mUpperHeight = parseInt(mobileUpperHeader.css('height'));
	mLowerHeight = parseInt(mobileLowerHeader.css('height'));
	mMenuHeight = windowH - mUpperHeight - mLowerHeight - mHeaderOffset;
	mBookHeight = windowH - mUpperHeight - mLowerHeight;
	mobileMenuDisplay.css('height', mMenuHeight +'px');
	mobileBookDisplay.css('height', mBookHeight + 'px');
}

// =========================================================================
// MOBILE MENU TOGGLE
// -------------------------------------------------------------------------
// * checking the mobile menu states
// =========================================================================
function mobileMenuToggle(mobileBurgerToggle){
    mobileBurgerToggle[0].addEventListener('click', function(){
    	var menuTransformDistance = mMenuHeight;
        if(mobileMenuActived && !mobileTransitioning){
        	releaseScroll();
            mobileMenuClose(mobileBurgerToggle);
        }else if(!mobileMenuActived && !mobileTransitioning){
        	lockScroll();
            mobileMenuOpen(mobileBurgerToggle,menuTransformDistance);
        }
    });
}



// =========================================================================
// MOBILE BOOK PAGE TOGGLE
// -------------------------------------------------------------------------
// * checking the mobile book page states
// * toggle is the opening button and toggle2 is the closing button
// * email functions
// =========================================================================
function mobileBookToggle(toggle,toggle2,mobileBurgerToggle){
	toggle.on({
		'mousedown': function(event) {
			// blur();
			// event.preventDefault();
	        // checkBookOpen(event);
	    },
	    'touchstart': function(event) {
	    	// blur();
	    	// event.preventDefault();
	    	// checkBookOpen(event);
	    },
	    'click': function(event){
	    	event.preventDefault();
	    	checkBookOpen(event);
	    }
	});

	// blur the input if user touch the content area, disable the virtual keyboard
	mobileBookContent.on({
		'mousedown': function() {
	        blur();
	    },
	    'touchstart': function() {
	    	blur();
	    }
	});

	// check if can close the book page
	toggle2.click(function(){
		if(mobileBookActived && !mobileTransitioning){
			mobileBookClose();
		}
	});


	menuBookSendButton.on({
		'mousedown': function(e) {
	        emailSend(e);
	    },
	    'touchstart': function(e) {
	    	emailSend(e);
	    }
	});

	// Check if can open the tbook page during the different states
	function checkBookOpen(event){
		var closeTransformDistance = mUpperHeight;
		var bookTransformDistance = mBookHeight;
		if(mobileMenuActived && !mobileBookActived && !mobileTransitioning){
			// event.preventDefault();
			// releaseScroll();
			mobileMenuClose(mobileBurgerToggle);
			// lockScroll();
			mobileBookOpen(closeTransformDistance,bookTransformDistance,toggle);
		}else if(!mobileBookActived && !mobileTransitioning){
			// event.preventDefault();
			lockScroll();
			mobileBookOpen(closeTransformDistance,bookTransformDistance,toggle);
		}else if(mobileBookActived){
			// event.preventDefault();
			menuBookInputBox.find('input').focus();
			// console.log('big clicked');
			// event.stopPropagation();
		}
	}

	function blur(){
		if(mobileBookActived || mobileTransitioning){
			menuBookInputBox.find('input').blur();
		}
	}
}

// email functions
function emailSend(e){
	if(mobileBookActived && !mobileTransitioning){
		e.preventDefault();
		menuBookInputBox.find('input').focus();//
		e.stopImmediatePropagation();
	}
}




// =========================================================================
// MOBILE BOOK PAGE GENERAL ANIMATION AND STRUCTURE
// -------------------------------------------------------------------------
// * 1. mobileBookShow and bookTitleLeave===> animate book page content in and texts
// * 2. after transition finished show close button on the upper header. 
//		if the toggle is the input box, focus input box after the transition
// * 3. after the close button transition, set states and remove listeners.
// =========================================================================
function mobileBookOpen(closeTransformDistance,bookTransformDistance,toggle){
	var element = document.getElementById("mobileBookDisplay");
	var element2 = document.getElementById("mobileUpperClose");
	element.addEventListener("transitionend", transitionCallback, false);
	element2.addEventListener("transitionend", transitionCallback2, false);
	mobileTransitioning = true;

	mobileBookShow(bookTransformDistance);
	bookTitleLeave();
	


	// console.log(menuBookInputBox.find('input'));
	// call Closs Button Show after BookDisplay transition finished.
	function transitionCallback(){
		mobileCloseShow(closeTransformDistance);
		// TODO CURRENT FOCUS()NOT WORKING ON IOS
		// if(toggle == menuBookInputBox){
			// menuBookInputBox.find('input').focus();
		// }
	}

	//do this after close button transition finished.
	function transitionCallback2(){
		mobileBookActived = true;
		mobileTransitioning = false;
		element.removeEventListener("transitionend", transitionCallback, false);
		element2.removeEventListener("transitionend", transitionCallback2, false);
	}
}




function mobileBookClose(){
	mobileTransitioning = true;
	var element = document.getElementById("mobileBookDisplay");
	var element2 = document.getElementById("mobileUpperClose");
	element2.addEventListener("transitionend", transitionCallback2, false);
	
	releaseScroll();

	mobileBookLeave();
	bookTitleIn();
	mobileCloseLeave();
	// call Closs Button Leave after BookDisplay transition finished.
	// element.addEventListener("transitionend", transitionCallback, false);
	// function transitionCallback(){
	// 	mobileCloseLeave();
	// }

	//do this after close button transition finished.
	function transitionCallback2(){
		mobileBookActived = false;
		mobileTransitioning = false;
		// element.removeEventListener("transitionend", transitionCallback, false);
		element2.removeEventListener("transitionend", transitionCallback2, false);
	}
}



// =========================================================================
// MOBILE MENU GENERAL ANIMATION AND STRUCTURE
// -------------------------------------------------------------------------
// * 1. animate upperHeader height
// * 2. after animation, animate menu content and lowerHeader
// * 3. after transition, call transitionCallback to set states and remove listeners
// =========================================================================
function mobileMenuOpen(mobileBurgerToggle,menuTransformDistance){
	mobileTransitioning = true;
	var element = document.getElementById("mobileLowerHeader");
	element.addEventListener("transitionend", transitionCallback, false);

	
	mobileBurgerToggle.addClass('active');
	mobileUpperHeader.animate({
		height: mUpperHeight + mHeaderOffset +'px'
	},200,function(){
		mobileMenuShow(menuTransformDistance);
	});

	function transitionCallback(){
		element.removeEventListener("transitionend", transitionCallback, false);
		mobileMenuActived = true;
		mobileTransitioning = false;
	}
}




function mobileMenuClose(mobileBurgerToggle){
	var element = document.getElementById("mobileLowerHeader");
	element.addEventListener("transitionend", transitionCallback, false);
	mobileTransitioning = true;

	
	mobileMenuLeave();
	mobileBurgerToggle.removeClass('active');
	function transitionCallback(){
		// mobileUpperHeader.removeClass('shadow');
		// mobileLowerHeader.removeClass('shadow');
		// mobileBookDisplay.addClass('shadow');
		mobileMenu.css({
			'z-index':10
		});
		mobileLowerHeader.css({
			'z-index':9
		});
		
		mobileUpperHeader.animate({
			height: mUpperHeight +'px'
		},200,function(){
			element.removeEventListener("transitionend", transitionCallback, false);
			mobileMenuActived = false;
			mobileTransitioning = false;
		});
	}
}



// =========================================================================
// LOCK BACKGROUND BODY
// -------------------------------------------------------------------------
// * prevent scrolling background when the menu or book page is opening
// =========================================================================
function lockScroll(){
	// bodyScrollValue = $(window).scrollTop();
	// $(window).scrollTop(0);
	$('html,body').addClass('noScroll');
	// console.log(bodyScrollValue);
}

function releaseScroll(){
	$('html,body').removeClass('noScroll');
	// $(window).scrollTop(bodyScrollValue);
}



function mobileMenuShow(menuTransformDistance){
	// mobileUpperHeader.addClass('shadow');
	// mobileLowerHeader.addClass('shadow');
	// mobileBookDisplay.removeClass('shadow');
	mobileMenu.css({
		'z-index':9
	});
	mobileLowerHeader.css({
		'z-index':10,
		'transform':'translate(0px, ' + menuTransformDistance + 'px)'
	});
	mobileMenuDisplay.css({
		'transform':'translate(0px, ' + menuTransformDistance + 'px)',
	});
	mobileMenuContent.css({
		'transform':'translate(0px, ' + -menuTransformDistance + 'px)'
	});

}



function mobileMenuLeave(){
	mobileLowerHeader.css({
		// 'z-index':9,
		'transform':'translate(0px, ' + 0 + 'px)'
	});
	mobileMenuDisplay.css({
		'transform':'translate(0px, ' + 0 + 'px)',
	});
	mobileMenuContent.css({
		'transform':'translate(0px, ' + 0 + 'px)'
	});
}



function mobileCloseShow(closeTransformDistance){
	mobileUpperWrapper.css({
		'transform':'translate(0px, ' + -closeTransformDistance + 'px)',
		'transition-timing-function': 'ease-out'
	});
	mobileUpperClose.css({
		'opacity':1,
		'transition': 'opacity 1s',
		'transition-timing-function': 'ease-in'
	});
	menuLogo.css({
		'opacity':0,
		'transition': 'opacity .5s',
		'transition-timing-function': 'ease-out'
	});
}


function mobileCloseLeave(){
	mobileUpperWrapper.css({
		'transform':'translate(0px, ' + 0 + 'px)',
		// 'transition': 'transform .5s'
		'transition-timing-function': 'ease-in'
	});
	mobileUpperClose.css({
		'opacity':0,
		'transition': 'opacity .2s',
		'transition-timing-function': 'ease-out'
	});
	menuLogo.css({
		'opacity':1,
		'transition': 'opacity 1s',
		'transition-timing-function': 'ease-int'
	});
}


function mobileBookShow(bookTransformDistance){
	mobileBookDisplay.css({
		'transform':'translate(0px, ' + bookTransformDistance + 'px)',
	});
	mobileBookLowerDisplay.css({
		'transform':'translate(0px, ' + -bookTransformDistance + 'px)',
	});
}


function mobileBookLeave(){
	mobileBookDisplay.css({
		'transform':'translate(0px, ' + 0 + 'px)',
	});
	mobileBookLowerDisplay.css({
		'transform':'translate(0px, ' + 0 + 'px)',
	});
}


function bookTitleLeave(){
	inputLeftWrapper.css({
		'transform':'translate(' + -mBookTitleWidth + 'px, 0px)',
	});

	if(!(menuBookInputBox.find('input')[0] === document.activeElement)){
		menuBookSendButton.css({
			'opacity':0.1
		})
	}
}

function bookTitleIn(){
	inputLeftWrapper.css({
		'transform':'translate(' + 0 + 'px, 0px)',
	});
	menuBookSendButton.css({
		'opacity':0
	})
}





// CANVAS PARTICLES


//Dust Particles Simulation by bionicoz based on
//Basic Particle Animation
//Author: Brandon John-Freso
function drawCanvas(){
    var W, H,
        canvas, ctx, //ctx stands for context and is the "curso" of our canvas element.
        particleCount = 800,
        particles = []; //this is an array which will hold our particles Object/Class

    W = window.innerWidth ;
    H = webMenuHeight ;
    
    canvas = $("#canvas").get(0); //this "get(0) will pull the underlying non-jquery wrapped dom element from our selection
    canvas.width = W;
    canvas.height = H;

    ctx = canvas.getContext("2d"); // settng the context to 2d rather than the 3d WEBGL
    ctx.globalCompositeOperation = "lighter";
    var mouse = {
      x: 0, 
      y: 0,
      rx:0,
      ry:0,
      speed:45,
      delta:0
    };
    


    document.addEventListener('mousemove', function(e){ 
        
        mouse.x = e.clientX || e.pageX; 
        mouse.y = e.clientY || e.pageY;
        mouse.x-=W/2;
        mouse.y-=H/2;
      
    }, false);
  
    function randomNorm(mean, stdev) {
      
      return Math.abs(Math.round((Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1))*stdev)+mean;
    }

    //Setup particle class
    function Particle() {
        //using hsl is easier when we need particles with similar colors
      	var randomNum = Math.random();
        this.r=parseInt(100 * randomNum + 0);
        this.g=parseInt(100 * randomNum + 0);
        this.b=parseInt(100 * randomNum + 0);
        this.a=0.7*Math.random()+0.3;
      
        this.color = "rgba("+ this.r +","+ this.g +","+ this.b +","+(this.a)+")";
        this.shadowcolor = "rgba("+ this.r +","+ this.g +","+ this.b +","+parseFloat(this.a-0.6)+")";
      

        
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.direction = {
            "x": -1 + Math.random() * 2,
            "y": -1 + Math.random() * 2
        };
        //this.radius = 9 * ((Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1)+3);
        this.radius = randomNorm(0,0.8);
        this.scale=0.2*Math.random()+0.8;
        this.rotation=Math.PI/4*Math.random();
      
        this.grad=ctx.createRadialGradient( this.x, this.y, this.radius, this.x, this.y, 0 );
        this.grad.addColorStop(0,this.color);
        this.grad.addColorStop(1,this.shadowcolor);
      
        this.vx = (10 * Math.random() + 10)*.01*this.radius;
        this.vy = (10 * Math.random() + 10)*.01*this.radius;
        
        this.valpha = 0.01*Math.random()-0.02;
        
        this.move = function () {
            this.x += this.vx * this.direction.x ;
            this.y += this.vy * this.direction.y ;
            this.rotation+=this.valpha;
            //this.radius*= Math.abs((this.valpha*0.01+1));

        };
        this.changeDirection = function (axis) {
            this.direction[axis] *= -1;
            this.valpha *= -1;
        };
        this.draw = function () {
            ctx.save();
            ctx.translate(this.x+mouse.rx/-20*this.radius,this.y+mouse.ry/-20*this.radius);  
          ctx.rotate(this.rotation);  
          ctx.scale(1,this.scale);
            
            this.grad=ctx.createRadialGradient( 0, 0, this.radius, 0, 0, 0 );
            this.grad.addColorStop(1,this.color);
            this.grad.addColorStop(0,this.shadowcolor);
            ctx.beginPath();
            ctx.fillStyle = this.grad;
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.restore();
        };
        this.boundaryCheck = function () {
            if (this.x >= W*1.2) {
                this.x = W*1.2;
                this.changeDirection("x");
            } else if (this.x <= -W*0.2) {
                this.x = -W*0.2;
                this.changeDirection("x");
            }
            if (this.y >= H*1.2) {
                this.y = H*1.2;
                this.changeDirection("y");
            } else if (this.y <= -H*0.2) {
                this.y = -H*0.2;
                this.changeDirection("y");
            }
        };
    } //end particle class

    function clearCanvas() {
        ctx.clearRect(0, 0, W, H);
    } //end clear canvas

    function createParticles() {
        for (var i = particleCount - 1; i >= 0; i--) {
            p = new Particle();
            particles.push(p);
        }
    } // end createParticles

    function drawParticles() {
        for (var i = particleCount - 1; i >= 0; i--) {
            p = particles[i];
            p.draw();
        }      
    } //end drawParticles

    function updateParticles() {
        for (var i = particles.length - 1; i >= 0; i--) {
            p = particles[i];
            p.move();
            p.boundaryCheck();

        }
    } //end updateParticles

    function initParticleSystem() {
        createParticles();
        drawParticles();
    }

    function animateParticles() {
        clearCanvas();
        setDelta();
        update()
        drawParticles();
        updateParticles();
        requestAnimationFrame(animateParticles);
    }
  
    initParticleSystem();
    requestAnimationFrame(animateParticles);
  
    function setDelta() {  
      this.now    =   (new Date()).getTime();  
      mouse.delta  =   (this.now-this.then)/1000;  
      this.then   =   this.now;  
    }
    function update() {  
 
	    if(isNaN(mouse.delta) || mouse.delta <= 0) { return; }  
	 
	    var distX   =   mouse.x - (mouse.rx),  
	        distY   =   mouse.y - (mouse.ry);  

	    if(distX !== 0 && distY !== 0) {          
	        mouse.rx -=  ((mouse.rx - mouse.x) / mouse.speed); 
	        mouse.ry -=  ((mouse.ry - mouse.y) / mouse.speed); 
	    }   
	};  
};
