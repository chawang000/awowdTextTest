// TODO make entire inputLeftWrapper or mobileEmailOuter clickable for input, stop propagation on children buttons
// TODO fix mobile device address bar bouncing



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
	burgerToggle = $('.menu_icon'),
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
	bodyScrollValue,
	lastScrollValue = 0,
	documentHeight,
	windowH,
	mHeaderOffset = 8;



$(window).on("load", function (e){
	mobileMenuSetter();
	mobileMenuToggle(burgerToggle);
	mobileBookToggle(menuBookTitle,mobileUpperClose,burgerToggle);
	mobileBookToggle(mobileEmailOuter,mobileUpperClose,burgerToggle);

	$(window).resize(function(){
	});


	$(document).on('touchmove scroll', function(){
		headerStatesController(mobileHeader, (mUpperHeight + mLowerHeight));
	});

	menuBookInputBox.find('input')[0].addEventListener("focus", bookFocusStyle);
	menuBookInputBox.find('input')[0].addEventListener("blur", bookBlurStyle);
});




function headerStatesController(header, headerHeight){
	var currentWindowScroll = $(window).scrollTop();
	if(currentWindowScroll > 300 && !mobileTransitioning && currentWindowScroll < (documentHeight-windowH-100)){
		if(currentWindowScroll > lastScrollValue && headerCanShow){
			header.css({
				'transform':'translate(0px,' + -headerHeight + 'px)',
				'transition':'transform 0.3s'
			});
			headerCanShow = false;
		}else if(currentWindowScroll < lastScrollValue && !headerCanShow){
			header.css({
				'transform':'translate(0px,' + 0 + 'px)',
				'transition':'transform 0.1s'
			});
			headerCanShow = true;
		}
	}
	
	// if(headerCanShow == false){
		
	// }else if(headerCanShow){
		
	// }

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
function mobileMenuSetter(){
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
	documentHeight = $(document).height();
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
function mobileMenuToggle(burgerToggle){
    burgerToggle[0].addEventListener('click', function(){
    	var menuTransformDistance = mMenuHeight;
        if(mobileMenuActived && !mobileTransitioning){
        	releaseScroll();
            mobileMenuClose(burgerToggle);
        }else if(!mobileMenuActived && !mobileTransitioning){
        	lockScroll();
            mobileMenuOpen(burgerToggle,menuTransformDistance);
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
function mobileBookToggle(toggle,toggle2,burgerToggle){
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
	mobileBookText.on({
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
			releaseScroll();
			mobileMenuClose(burgerToggle);
			lockScroll();
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
function mobileMenuOpen(burgerToggle,menuTransformDistance){
	mobileTransitioning = true;
	var element = document.getElementById("mobileLowerHeader");
	element.addEventListener("transitionend", transitionCallback, false);

	
	burgerToggle.addClass('active');
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




function mobileMenuClose(burgerToggle){
	var element = document.getElementById("mobileLowerHeader");
	element.addEventListener("transitionend", transitionCallback, false);
	mobileTransitioning = true;

	
	mobileMenuLeave();
	burgerToggle.removeClass('active');
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
	bodyScrollValue = $(window).scrollTop();
	$(window).scrollTop(0);
	$('html,body').addClass('noScroll');
	// console.log(bodyScrollValue);
}

function releaseScroll(){
	$('html,body').removeClass('noScroll');
	$(window).scrollTop(bodyScrollValue);
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


