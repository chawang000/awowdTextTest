var mobileMenuActived = false,
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
	mobileUpperClose = $('#mobileUpperClose'),//close button
	mobileCloseText = $('#mobileCloseText'),
	mobileUpperWrapper = $('#mobileUpperWrapper'),
	mobileBookLife = $('#mobileBookLife'),
	mobileBookDisplay = $('#mobileBookDisplay'),
	mobileBookContent = $('#mobileBookContent'),
	mobileBookText = $('#mobileBookText'),
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
	mHeaderOffset = 8;

$(window).on("load", function (e){
	// console.log('yoyoyo');
	mobileMenuSetter();
	mobileMenuToggle(mobileUpperLogo);
	mobileBookToggle(menuBookTitle,mobileUpperClose);
	mobileBookToggle(menuBookInputBox,mobileUpperClose);

	$(window).resize(function(){
		// mobileMenuSetter();
	});

	$(document).on({
		'touchmove': function(e) {
	        lockScroll(e);
	    },
	    'scroll': function(e) {
	    	lockScroll(e);
	    },
	    'mousewheel': function(e){
	    	lockScroll(e);
	    }
	});

	menuBookInputBox.find('input')[0].addEventListener("focus", bookFocusStyle);
	menuBookInputBox.find('input')[0].addEventListener("blur", bookBlurStyle);
});

function bookFocusStyle(){
	// console.log('focused');
	mobileEmailOuter.css('border-color','#000');
	// mobileCloseText.css('color','#ccc');
	menuBookSendButton.css('opacity','1');
}

function bookBlurStyle(){
	// console.log('focused');
	mobileEmailOuter.css('border-color','#eee');
	// mobileCloseText.css('color','#000');
	menuBookSendButton.css('opacity','0');
}

function lockScroll(e){
	// if (!mobileMenuActived && !mobileBookActived && !mobileTransitioning) return;
	if(mobileMenuActived || mobileBookActived || mobileTransitioning){
		$('html,body').addClass('noScroll');
		bodyLocked = true;

    	// e.stopPropagation();
    	// mobileBookContent.css('overflow-y','scroll');
	}else if(bodyLocked){
		$('html,body').removeClass('noScroll');
		bodyLocked = false;
	}

}


function mobileMenuSetter(){
	var windowH = $(window).height();
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

	// console.log(mEmailSendWidth);
}



//Menu toggle
function mobileMenuToggle(toggle){
	toggle.click(function(){
		var menuTransformDistance = mMenuHeight;
		// console.log(menuTransformDistance);
		if(mobileMenuActived && !mobileTransitioning){
			mobileMenuClose();
		}else if( !mobileMenuActived && !mobileTransitioning){
			mobileMenuOpen(menuTransformDistance);
			
		}
	});
}



//Book a life toggle
function mobileBookToggle(toggle,toggle2){
	toggle.on({
		'mousedown': function(event) {
	        clickedAnim(event);
	    },
	    'touchstart': function(event) {
	    	clickedAnim(event);
	    }
	});

	function clickedAnim(event){
		var closeTransformDistance = mUpperHeight;
		var bookTransformDistance = mBookHeight;
		// if
		if(mobileMenuActived && !mobileBookActived && !mobileTransitioning){
			// console.log('menu is actived');
			event.preventDefault();
			mobileMenuClose();
			mobileBookOpen(closeTransformDistance,bookTransformDistance,toggle);
		}else if(!mobileBookActived && !mobileTransitioning){
			mobileBookOpen(closeTransformDistance,bookTransformDistance,toggle);
		}
	}


	mobileBookText.on({
		'mousedown': function() {
	        blur();
	    },
	    'touchstart': function() {
	    	blur();
	    }
	});

	function blur(){
		if(mobileBookActived || mobileTransitioning){
			menuBookInputBox.find('input').blur();
		}
	}
		
	toggle2.click(function(){
		if(mobileBookActived && !mobileTransitioning){
			mobileBookClose();
		}
	});
}



function mobileBookOpen(closeTransformDistance,bookTransformDistance,toggle){
	var element = document.getElementById("mobileBookDisplay");
	var element2 = document.getElementById("mobileUpperClose");
	element.addEventListener("transitionend", transitionCallback, false);
	element2.addEventListener("transitionend", transitionCallback2, false);
	mobileTransitioning = true;

	mobileBookShow(bookTransformDistance);
	bookTitleLeave();
	// call Closs Button Show after BookDisplay transition finished.
	function transitionCallback(){
		mobileCloseShow(closeTransformDistance);
		if(toggle == menuBookInputBox){
			menuBookInputBox.find('input').focus();
		}
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
	var element = document.getElementById("mobileBookDisplay");
	var element2 = document.getElementById("mobileUpperClose");
	element.addEventListener("transitionend", transitionCallback, false);
	element2.addEventListener("transitionend", transitionCallback2, false);
	mobileTransitioning = true;


	mobileBookLeave();
	bookTitleIn();
	// call Closs Button Leave after BookDisplay transition finished.
	function transitionCallback(){
		mobileCloseLeave();
	}

	//do this after close button transition finished.
	function transitionCallback2(){
		mobileBookActived = false;
		mobileTransitioning = false;
		element.removeEventListener("transitionend", transitionCallback, false);
		element2.removeEventListener("transitionend", transitionCallback2, false);
	}
}




function mobileMenuOpen(menuTransformDistance){
	var element = document.getElementById("mobileLowerHeader");
	element.addEventListener("transitionend", transitionCallback, false);
	mobileTransitioning = true;
	function transitionCallback(){
		element.removeEventListener("transitionend", transitionCallback, false);
		mobileMenuActived = true;
		mobileTransitioning = false;
	}

	mobileUpperHeader.animate({
		height: mUpperHeight + mHeaderOffset +'px'
	},200,function(){
		mobileMenuShow(menuTransformDistance);
	});
	// mobileMenuActived = true;
}




function mobileMenuClose(){
	var element = document.getElementById("mobileLowerHeader");
	element.addEventListener("transitionend", transitionCallback, false);
	mobileTransitioning = true;

	mobileMenuLeave();

	function transitionCallback(){
		mobileUpperHeader.removeClass('shadow');
		mobileLowerHeader.removeClass('shadow');
		mobileBookDisplay.addClass('shadow');
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


function mobileMenuShow(menuTransformDistance){
	mobileUpperHeader.addClass('shadow');
	mobileLowerHeader.addClass('shadow');
	mobileBookDisplay.removeClass('shadow');
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
}


function mobileBookShow(bookTransformDistance){
	mobileBookDisplay.css({
		'transform':'translate(0px, ' + bookTransformDistance + 'px)',
	});
	mobileBookContent.css({
		'transform':'translate(0px, ' + -bookTransformDistance + 'px)',
	});
}


function mobileBookLeave(){
	mobileBookDisplay.css({
		'transform':'translate(0px, ' + 0 + 'px)',
	});
	mobileBookContent.css({
		'transform':'translate(0px, ' + 0 + 'px)',
	});
}


function bookTitleLeave(){
	inputLeftWrapper.css({
		'transform':'translate(' + -mBookTitleWidth + 'px, 0px)',
	});
	menuBookSendButton.css({
		'opacity':0.4
	})
}

function bookTitleIn(){
	inputLeftWrapper.css({
		'transform':'translate(' + 0 + 'px, 0px)',
	});
	menuBookSendButton.css({
		'opacity':0
	})
}


