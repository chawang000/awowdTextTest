// TODO TITLE ANIMATION SHOULD NOT FIRE IF THE WINDOW HEIGHT IS SMALLER THAN CERTAIN PX
// TODO SOMETIMES NON OF THE PROPERTY IS SAVED, PROPERTY READ AS UNDEFINED
// TODO MORE STYLES FOR TITLE AND PARA ANIMATION
// TODO FIX ANIMATION DISTANCE TOO SHORT BUG,IF WINDOW IS NOT WIDE ENOUGH,THERE IS NO SCROLL ANIMATION

var detectionDistance = 150,//TODO this value is depending on (#videoBG .threeFifthContainer)' margin-top for the first para
    stopDistance = 250,
    scrollTextParaOffset = 300, //this is how many px before detectionDistance that trigger the paragraph scroll
    paraScrollDistanceMax = 300,
    paraScrollDistanceMultiplier = .4,
    imgFadeOpacity = 0.5,
    imgTransformTime = 0.3,
    globalSpeed = 1,
    animateTitleArray;

var textBaseFontSize, // set in contentDivSetter() 
    textBaseFontFamily, // set in contentDivSetter() 
    textTargetFontFamily, // set in contentDivSetter() 
    textTargetFontSize, // set in contentDivSetter() 
    lastWordMarginLeft, // set in contentDivSetter() 
    paraLastFrameProgress, // set in scrollDetection()
    imgTransformDistance, // set in contentDivSetter() window width
    titleLastFrameProgress; // set in scrollDetection()
// SPEED VARIABLES

$(document).ready(function(){
    (function() {
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

        /* init - you can init any event */
        throttle("resize", "optimizedResize");
    })();

    
    window.addEventListener( 'load', webFunctions, false );
    window.addEventListener( 'scroll', webScrollFunctions ,true );
    window.addEventListener("optimizedResize", webResizeFunctions);
});

// =========================================================================
// WINDOW LOAD SETTER
// -------------------------------------------------------------------------
// * calculate here to ensure content are fully loaded and styled
// =========================================================================
$(window).on("load", function (){
    // console.log('window width is'+ $(window).width());
    // if(isMobile) {
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
    //     // console.log('mobile device')
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
    //     // console.log('web');
    //     // webFunctions();
    // }
    
});//Window load END
// $(window).bind("load",webFunctions);


var webResizeFunctions = function(){
    // RESIZE AND RECALCULATE THE ATTRIBUTES
    // * scroll event will be fired if the window is scrolled after resize
    // if(isMobile) return;
    contentDivSetter();
    for (var i = 0; i < animateTitleArray.length; i++){
        var animatedTitle = animateTitleArray[i];
        var lastTitle = animateTitleArray[i-1];
        var nextTitle = animateTitleArray[i+1];
        setToInitialPosition(animatedTitle);//set to initial position before caculation
        animationInitialize(animatedTitle,lastTitle,nextTitle);
    }
}

//  RESIZE
// $(window).resize(function(){
//     // RESIZE AND RECALCULATE THE ATTRIBUTES
//     // * scroll event will be fired if the window is scrolled after resize
//     // if(isMobile) return;
//     contentDivSetter();
//     for (var i = 0; i < animateTitleArray.length; i++){
//         var animatedTitle = animateTitleArray[i];
//         var lastTitle = animateTitleArray[i-1];
//         var nextTitle = animateTitleArray[i+1];
//         setToInitialPosition(animatedTitle);//set to initial position before caculation
//         animationInitialize(animatedTitle,lastTitle,nextTitle);
//     }
// });

var webFunctions = function(){
        // WINDOW LOAD SETTER
    console.log("webFunctions");
    animateTitleArray = document.getElementsByClassName("animatedTitle");
    textToSpan();
    contentDivSetter();
    chameleonColor();
   
    // SETTER AND CALCULATION OF EACH SECTION
    for (var i = 0; i < animateTitleArray.length; i++){
        var animatedTitle = animateTitleArray[i];
        var lastTitle = animateTitleArray[i-1];
        var nextTitle = animateTitleArray[i+1];
        animationInitialize(animatedTitle,lastTitle,nextTitle);
    }
}

var webScrollFunctions = function(){
    // console.log('scroll');
    var currentScroll = $(document).scrollTop();
    for (var i = 0; i < animateTitleArray.length; i++){
        var animatedTitle = animateTitleArray[i];
        var lastTitle = animateTitleArray[i-1];
        var nextTitle = animateTitleArray[i+1];
        scrollDetection(animatedTitle,lastTitle,nextTitle,currentScroll);
    }
}
// SCROLL
    // $(window).scroll(function(){
    //     // RESIZE AND RECALCULATE THE ATTRIBUTES
    //     for (var i = 0; i < animateTitleArray.length; i++){
    //         var animatedTitle = animateTitleArray[i];
    //         var lastTitle = animateTitleArray[i-1];
    //         var nextTitle = animateTitleArray[i+1];
    //         scrollDetection(animatedTitle,lastTitle,nextTitle);
    //     }
    // });



// =========================================================================
// =========================================================================
// =========================================================================
//                                HOME PAGE
// =========================================================================
// =========================================================================
// =========================================================================
// -------------------------------------------------------------------------
// * Home page has two types of animations: TITLE ANIMATION and PARA ANIMATON



// =========================================================================
// "ANIMATION FLOW"
// -------------------------------------------------------------------------
// (detectionDistance + scrollTextParaOffset) ===> trigger para scroll animation
// detectionDistance ===> stop para scroll, trigger title animation
// stopDistance ===> titile reach the target position




// =========================================================================
// SET AND CALCULATE PROPERTIES OF EACH SECTION
// -------------------------------------------------------------------------
// * animatedTitle is based on the titles that need to be animated
// * it will calculate data that are needed and save them individually as properties
// * it will reset positions of all elements based on current scroll
// =========================================================================
function animationInitialize(animatedTitle,lastTitle,nextTitle){
    var targetPosElement =  document.getElementById(animatedTitle.getAttribute('data-target-element'));
    var animatedTitleParent = $(animatedTitle).parent('p');
    var firstTextSpan = animatedTitleParent.find('.textSpan:first-child');
    var firstTextSpanPos = firstTextSpan.offset();
    var lastWord = firstTextSpan.find('.word:last-child');
    var lastWordPos = $(lastWord).offset();
    var animatedTitleTop = lastWordPos.top + $(lastWord).height();//because inline-block top is based on last element top
    animatedTitle.animatedTitleTop = animatedTitleTop;


    // CALCULATE PARA SCROLL DISTANCE
    // * paraScrollDistance is need for how much distance the paragraph can be scrolled
    // * calculated by comparing parent div bottom boarder and textArea bottom boarder
    var paraScrollDistance = caculateParaScrollDistance();
    function caculateParaScrollDistance(){
        var sectionDiv = $(animatedTitle).parents('div.content');
        if(sectionDiv[0] == null){
            sectionDiv = $(animatedTitle).parents('#videoBG');
        }

        var sectionBottom = sectionDiv.offset().top + sectionDiv.height();
        var textArea = $(animatedTitle).parents('.textArea');
        var textAreaBottom = textArea.offset().top + textArea.height();

        var paraScrollDistance = (sectionBottom - textAreaBottom) * paraScrollDistanceMultiplier;
        if (paraScrollDistance <= 50) {
            paraScrollDistance = 50;
        }else if(paraScrollDistance > paraScrollDistanceMax){
            paraScrollDistance = paraScrollDistanceMax
        }
        return paraScrollDistance;
    }
    animatedTitle.paraScrollDistance = paraScrollDistance;
    animatedTitle.TextParaScrollSpeed = paraScrollDistance / ( paraScrollDistance + scrollTextParaOffset);



    // CHECK IF THERE IS A NEXT TARGET TITLE POSITION
    // -------------------------------------------------------------------------
    // * if there is, it means current paragraphy is not the last paragraph
    // * calculate the data that are needed to animate the title
    // * otherwise just get animatedTitleTop and paraScrollDistance which were calculated above
    if(targetPosElement != null){
        insertTitleToTarget();
        function insertTitleToTarget(){
            removePeriod(animatedTitle);
            targetPosElement.innerHTML = $(animatedTitle).find('.textSpan')[0].innerHTML;
            $(targetPosElement).css({
                'opacity':0,
                'font-family':textTargetFontFamily,
                'font-size':textTargetFontSize + 'px'
            });
        }

        var titleParentPos = animatedTitleParent.offset();
        var firstWord = $(animatedTitle).find('.word')[0];
        var targetPos = $(targetPosElement).offset();
        var firstWordPos = $(firstWord).offset();
        var targetTop = targetPos.top;
        var animateDistance = targetTop - stopDistance - animatedTitleTop + detectionDistance - paraScrollDistance;
        animatedTitle.targetFixedTop = targetTop;
        animatedTitle.animateDistance = animateDistance;

        getAnimatingSpeed();
        function getAnimatingSpeed(){
            animatedTitle.textFontSizeSpeed = (textTargetFontSize - textBaseFontSize) / animateDistance;
        }

        getTransformSpeed();
        function getTransformSpeed(){
            transformDistanceX = targetPos.left - titleParentPos.left;
            transformDistanceY = targetPos.top - animatedTitleTop - paraScrollDistance;
            animatedTitle.transformSpeedX = transformDistanceX / animateDistance;
            animatedTitle.transformSpeedY = transformDistanceY / animateDistance;

            innerOffsetDistanceX = firstWordPos.left - titleParentPos.left - lastWordMarginLeft;
            innerOffsetDistanceY = lastWordPos.top - firstWordPos.top + $(firstWord).height();
            animatedTitle.innerOffsetSpeedX = innerOffsetDistanceX / animateDistance;
            animatedTitle.innerOffsetSpeedY = innerOffsetDistanceY / animateDistance;
            animatedTitle.firstWord = firstWord;
        }
    }


    // SET ELEMENTS' POSITIONS BASED ON CURRENT SCROLL
    // -------------------------------------------------------------------------
    // * to ensure elements are positioned correctly after refresh or resize
    // * setter is based on three states. ABOVE, DURING AND COMPLETE
    setCurrentState();
    function setCurrentState(){
        var currentScroll = $(document).scrollTop();
        var animatedTitleCurrentTop = animatedTitleTop - currentScroll;
        var paraTotalDistance = paraScrollDistance+scrollTextParaOffset; 
        var titleNotTriggered = animatedTitleCurrentTop <= detectionDistance + scrollTextParaOffset;
        var titleCompleteAnimate = animatedTitleCurrentTop <= (detectionDistance - paraScrollDistance);
        

        // * titleNotTriggered MEANING current scroll is during para scroll, but not triggered title animation yet
        // * titleCompleteAnimate MEANING current title has reached the target position
        // * else MEANING current scroll is above the title, neither title animation nor para animation has been triggered.
        if(titleCompleteAnimate){
            removePeriod(animatedTitle);
            textParaScroll(animatedTitle,paraTotalDistance,lastTitle);
            setTitleProgressingPosition(animatedTitle,animateDistance);
        }else if(titleNotTriggered){
            // do not need to set anything because if window is not at starting position, it will run functions inside of scroll event
            addPeriod(animatedTitle);
        }else{
            textParaScroll(animatedTitle,0,lastTitle);
            addPeriod(animatedTitle);
        }


        if(typeof lastTitle !== 'undefined'){
            var lastTitleTargetTop = lastTitle.targetFixedTop - currentScroll; //this is the lastTitle's targetTop
        }

        var imgShow = animatedTitleCurrentTop >= (detectionDistance - paraScrollDistance) && lastTitleTargetTop <= stopDistance;
        var imgIsAbove = lastTitleTargetTop <= stopDistance && !imgShow;
        var imgIsBelow = animatedTitleCurrentTop >= (detectionDistance - paraScrollDistance) && !imgShow;

        if(imgIsAbove){
            setImageTransform(animatedTitle,-imgTransformDistance,imgFadeOpacity,0);
        }else if(imgIsBelow){
            setImageTransform(animatedTitle,imgTransformDistance,imgFadeOpacity,0);
        }
    }

    animatedTitle.consoleElement = paraScrollDistance;// used for debug
}



function setImageTransform(theTitle,imgTransform,imgOpacity,transformTime){
    if(typeof theTitle !== 'undefined'){
        var contentImage = $(theTitle).parents('.threeFifthContainer').siblings('.contentImage'); 
        contentImage.css({
            'transform':'translate(0px,' + imgTransform + 'px)',
            'opacity':imgOpacity,
            'transition':'all ' + transformTime + 's'
        });
    }
}



// =========================================================================
// FUNCTION THAT DETEMINES WHICH FUNCTION SHOULD BE TRIGGERED DURING SCROLL
// -------------------------------------------------------------------------
// * get all properties that were saved during animationInitialize
// * set positions within the scroll detection
// * set position outside of the detection but elements are not at the final position
// =========================================================================
function scrollDetection(animatedTitle,lastTitle,nextTitle,currentScroll){

    var paraScrollDistance = animatedTitle.paraScrollDistance;
    console.log(currentScroll);
    var animatedTitleCurrentTop = animatedTitle.animatedTitleTop - currentScroll;
    var targetPosElement = animatedTitle.targetPosElement;
    var targetTop = animatedTitle.targetFixedTop - currentScroll;
    var animateDistance = animatedTitle.animateDistance;

    var titleCurrentProgress = animateDistance - (targetTop - stopDistance);
    var startAnimateTitle = canAnimateTitle(animatedTitleCurrentTop, targetTop,paraScrollDistance);

    var scrollFullDistance = paraScrollDistance + scrollTextParaOffset;
    var paraScrollProgress = scrollFullDistance - (animatedTitleCurrentTop - detectionDistance + paraScrollDistance);
    var startScrollTextPara = canScrollTextPara(animatedTitleCurrentTop,paraScrollDistance);

    paraLastFrameProgress = animatedTitle.paraLastFrameProgress;
    titleLastFrameProgress = animatedTitle.titleLastFrameProgress;



    // LAST FRAME SETTER
    // -------------------------------------------------------------------------
    // * set elements to the correct position by comparing last frame scroll poistion and current scroll position
    // * need this because it is difficult for users to scroll to where elements should be

    // PARA START POSITION (SCROLL UP)
    // set position to where paragraph should be when scroll back
    if(paraLastFrameProgress >= 0 && paraScrollProgress < 0 ){
        textParaScroll(animatedTitle,0,lastTitle);
    }
    // PARA FINAL POSITION (SCROLL DOWN)
    // set position to where para should be at finnal position
    if(paraLastFrameProgress <= scrollFullDistance && paraScrollProgress > scrollFullDistance){
        textParaScroll(animatedTitle,scrollFullDistance,lastTitle);
        if(typeof nextTitle != 'undefined'){
            setImageTransform(animatedTitle,-imgTransformDistance,imgFadeOpacity,imgTransformTime);
            removePeriod(animatedTitle);
        }
    }
    // TITLE START POSITION (SCROLL UP)
    // set position to where title was not scrolled
    if(titleLastFrameProgress >= 0 && titleCurrentProgress < 0){
        setToInitialPosition(animatedTitle);
        setImageTransform(animatedTitle,0,1,imgTransformTime);
        addPeriod(animatedTitle);
    }
    // TITLE FINAL POSITION (SCROLL DOWN)
    // set position to where title should be at finnal position
    if(titleLastFrameProgress <= animateDistance && titleCurrentProgress > animateDistance){
        setTitleProgressingPosition(animatedTitle,animateDistance);
        setImageTransform(nextTitle,0,1,imgTransformTime);
    }
    // TITLE FINAL POSITION (SCROLL UP)
    // leave the final position
    if(titleLastFrameProgress >= animateDistance && titleCurrentProgress < animateDistance){
        setTitleProgressingPosition(animatedTitle,animateDistance);
        setImageTransform(nextTitle,imgTransformDistance,imgFadeOpacity,imgTransformTime);
    }


    // CHECK IF ELEMENTS' POSITIONS WITHIN THE DETECTION
    if(startAnimateTitle){
        setTitleProgressingPosition(animatedTitle,titleCurrentProgress);
    }else if(startScrollTextPara){
        textParaScroll(animatedTitle,paraScrollProgress,lastTitle);
    }
    // caculate last frame progress
    animatedTitle.paraLastFrameProgress = paraScrollProgress;   
    animatedTitle.titleLastFrameProgress = titleCurrentProgress; 
}//END OF scrollDetection


// add/remove the period for the animating title
function addPeriod(animatedTitle){
    var lastWord = $(animatedTitle).find('.word:last-child').html();
    lastWord = lastWord.replace(/\./g, "");
    lastWord = lastWord + '.';
    $(animatedTitle).find('.word:last-child').html(lastWord);
}
function removePeriod(animatedTitle){
    var lastWord = $(animatedTitle).find('.word:last-child').html();
    lastWord = lastWord.replace(/\./g, "");
    $(animatedTitle).find('.word:last-child').html(lastWord);
}



// =========================================================================
// CONDITION CHECKERS
// -------------------------------------------------------------------------
// * canScrollTextPara checks if can animate Paragraph scroll
// * canAnimateTitle checks if can animate Title animation
// * check the comment "ANIMATION FLOW" 
// =========================================================================
function canScrollTextPara(animatedTitleCurrentTop,paraScrollDistance){
    if(animatedTitleCurrentTop >= (detectionDistance - paraScrollDistance) && animatedTitleCurrentTop <= detectionDistance + scrollTextParaOffset){
        return true;
    }
}
function canAnimateTitle(animatedTitleCurrentTop, targetTop,paraScrollDistance){
    if(animatedTitleCurrentTop < (detectionDistance - paraScrollDistance)  && targetTop > stopDistance){
        return true;
    }
}



// =========================================================================
// SET EVERYTHING TO INITIAL POSITION
// -------------------------------------------------------------------------
// * run before animationInitialize after user resize the window
// * need this because all properties are caculated based on the initial stats
// =========================================================================
function setToInitialPosition(animatedTitle){
    var animatedTitleParent = $(animatedTitle).parent('p');
    var titleCurrentProgress = 0;
    var firstWord = animatedTitle.firstWord;
    animatedTitleParent.css({
        'transform':'translate( ' + 0 +'px, ' + 0 + 'px)'
    });

    $(animatedTitle).css({
        // 'color':'rgb(' + textNextColor + ','+ textNextColor + ',' + textNextColor + ')',
        'transform':'translate( ' + 0 +'px, ' + 0 + 'px)',
        'font-family':textBaseFontFamily,
        'font-size': textBaseFontSize + titleCurrentProgress + 'px',
        'position':'inherit',
        'display': 'inline',
        'top': 0 + 'px'
        // 'letter-spacing': letterSpacingBase +TargettitleCurrentProgress/letterSpacingShrink,
    });

    $(firstWord).css({
        'margin-left': lastWordMarginLeft + 'px'
    });
}



// =========================================================================
// SET TITLE POSITION WITHIN THE DETECTION
// -------------------------------------------------------------------------
// * get all properties that were saved during animationInitialize
// * initial title position is very different than progressing and final position because former is styled as paragraph small text and latters are styled as titles.
// =========================================================================
function setTitleProgressingPosition(animatedTitle,titleCurrentProgress){
    // console.log(animatedTitle.consoleElement);
    // TRANSFORM
    var transformSpeedX = animatedTitle.transformSpeedX;
    var transformSpeedY = animatedTitle.transformSpeedY;
    var textNextPositionX = globalSpeed * transformSpeedX * titleCurrentProgress;
    var textNextPositionY = globalSpeed * transformSpeedY * titleCurrentProgress;

    // INNEROFFSET
    var firstWord = animatedTitle.firstWord;
    var innerOffsetSpeedX = animatedTitle.innerOffsetSpeedX;
    var innerOffsetSpeedY = animatedTitle.innerOffsetSpeedY;
    var animateDistance = animatedTitle.animateDistance;
    var textNestOffsetX = globalSpeed * innerOffsetSpeedX * (animateDistance - titleCurrentProgress);
    var textNestOffsetY = -1 * globalSpeed * innerOffsetSpeedY * (animateDistance - titleCurrentProgress);
    var textFontSizeSpeed = globalSpeed * animatedTitle.textFontSizeSpeed;
    $(animatedTitle).css({
                        // 'color':'rgb(' + textNextColor + ','+ textNextColor + ',' + textNextColor + ')',
                        'transform':'translate( ' + textNextPositionX +'px, ' + textNextPositionY + 'px)',
                        'font-family':textTargetFontFamily,
                        'font-size': textBaseFontSize + titleCurrentProgress * textFontSizeSpeed + 'px',
                        'position':'relative',
                        'display': 'inline-block',
                        'top': textNestOffsetY + 'px'
                        // 'letter-spacing': letterSpacingBase +TargettitleCurrentProgress/letterSpacingShrink,
                    });

    $(firstWord).css({
        'margin-left': lastWordMarginLeft + textNestOffsetX + 'px'
    });
}



// =========================================================================
// SET PARAGRAPH POSITION WITHIN DETECTION
// -------------------------------------------------------------------------
// * animate current paragraph and the title from the last paragraph
// =========================================================================
function textParaScroll(animatedTitle,paraScrollProgress,lastTitle){
    var TextParaScrollSpeed = animatedTitle.TextParaScrollSpeed;
    var animatedTitleParent = $(animatedTitle).parent('p');

    animatedTitleParent.css({
        'transform':'translate( ' + 0 +'px, ' + paraScrollProgress * TextParaScrollSpeed + 'px)'
    });

    if(typeof lastTitle !== 'undefined'){
        $(lastTitle).css({
            'transform':'translate( ' + (lastTitle.transformSpeedX*lastTitle.animateDistance) +'px, ' + (lastTitle.transformSpeedY*lastTitle.animateDistance+paraScrollProgress * TextParaScrollSpeed) + 'px)'
        });
    }
}



// =========================================================================
// SET ATTRIBUTES THAT ARE NOT VERIED FROM DEFERENT PARAGRAPHS
// -------------------------------------------------------------------------
// * content div h/w ratio is 8/16
// * 200 is the content div padding-top + padding-bottom
// * setter of base and final attributes. Get from css styling
// =========================================================================
function contentDivSetter(){
    var windowW = $(window).width();
    var windowH = $(window).height();
    var contentDivHeight = 8/16 * windowW;
    if(windowH < contentDivHeight + 200){//videoBG should be at least as tall as the content div to ensure the text animation
        $('#videoBG').css({
            'height': contentDivHeight + 200 + 'px'
        });
    }else{
        $('#videoBG').css({
            'height': windowH + 'px'
        });
    }

    $('.content').css({
        'height': contentDivHeight + 'px'
    });

    
    $('.textArea').css({
        'padding-top':1/16 * windowW + 'px'
    });//TODO MOVE TO TEXT INITIALIZE TO SET PADDING INDIVIDUALLY

    imgTransformDistance = 1/16 * windowW;

    textBaseFontSize = parseInt($('.smallText p').css('font-size'));
    textTargetFontFamily = $('.titleTargetPosition').css('font-family');
    textTargetFontSize = parseInt($('.titleTargetPosition').css('font-size'));
    textBaseFontFamily = $('.smallText p').css('font-family');
    lastWordMarginLeft = parseInt($('.word').css('margin-left'));
}




// =========================================================================
// SEPRATE EACH WORD TO INDIVIDUAL BLOCKS
// -------------------------------------------------------------------------
// * seprate the paragraph to two textSpan
// * the structure for the second textSpan is <span class="animatedTitle"><span class="textSpan">BLA BLA BLA</span></span>
// * seprate each word to span block and give each them a class ".word"
// =========================================================================
function textToSpan(){
    var paragraphSections = $(".smallText p .textSpan");
    for(i = 0; i < paragraphSections.length; i++){
        paragraphSection = paragraphSections[i];
        if(paragraphSection != null){
            var words = $(paragraphSection).text().split(" ");
            $(paragraphSection).empty();
            $.each(words, function(i, v) {
                $(paragraphSection).append($("<span class='word'>").text(v));
            });
        }
    }
}

// =========================================================================
// SECTION 4 COLOR CHANGE
// -------------------------------------------------------------------------
// * 
// =========================================================================
function chameleonColor(){
    var chameleonPink = {
        imgObj:$('#chameleonPink'),
        backgroundColor:'#cc3341'
    }

    var chameleonBlue = {
        imgObj:$('#chameleonBlue'),
        backgroundColor:'#73B6DD'
    }

    var chameleonOrange = {
        imgObj:$('#chameleonOrange'),
        backgroundColor:'#ff6026'
    }



    var chameleons = [chameleonPink,chameleonBlue,chameleonOrange];

    var count = 0;//start from the second image

    var colorLoop = setInterval(function(){ 
         if(count < chameleons.length-1){
            count += 1;
            changeColor(count,count-1);
        }else{
            count = 0;
            changeColor(count,chameleons.length-1);
            
        }
        
    }, 6000);

    function changeColor(count,lastImgCount){
        // console.log(chameleons[count].imgObj);
        // console.log(chameleons[lastImgCount].imgObj);
        var currentChameleon = chameleons[count].imgObj;
        var lastChameleon = chameleons[lastImgCount].imgObj;

        $('#homeSection_4').animate({
            backgroundColor:chameleons[count].backgroundColor
        },500,function(){
            window.setTimeout(function(){
                currentChameleon.animate({
                    opacity: 1
                },3000);
                lastChameleon.animate({
                    opacity: 0
                },3000);
            } ,500);
            
        });
    }
}













