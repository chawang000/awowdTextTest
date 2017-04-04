// TODO TITLE ANIMATION SHOULD NOT FIRE IF THE WINDOW HEIGHT IS SMALLER THAN CERTAIN PX

var detectionDistance = 200,
    stopDistance = 400,
    scrollTextParaOffset = 300, //this is how many px before detectionDistance that trigger the paragraph scroll
    paraScrollDistanceMax = 300,
    paraScrollDistanceMultiplier = .4,
    imgFadeOpacity = 0.5,
    globalSpeed = 1;

var textBaseFontSize,
    textBaseFontFamily,
    textTargetFontFamily,
    textTargetFontSize,
    lastWordMarginLeft, // set in textToSpan() based on CSS marginLeft
    paraLastFrameProgress,// set in titleStates()
    imgTransformDistance,// set in contentDivSetter() window width
    titleLastFrameProgress;// set in titleStates()


// SPEED VARIABLES

$(document).ready(function(){
    
});

$(window).on("load", function (e){
    animateTitleArray = document.getElementsByClassName("animatedTitle");
    textToSpan();
    contentDivSetter();
    
    for (var i = 0; i < animateTitleArray.length; i++){
        var animatedTitle = animateTitleArray[i];
        var lastTitle = animateTitleArray[i-1];
        var nextTitle = animateTitleArray[i+1];
        textAnimationInitialize(animatedTitle,lastTitle,nextTitle);
    }

    $(window).resize(function(){
        contentDivSetter();
        for (var i = 0; i < animateTitleArray.length; i++){
            var animatedTitle = animateTitleArray[i];
            var lastTitle = animateTitleArray[i-1];
            var nextTitle = animateTitleArray[i+1];
            setTextInitialPosition(animatedTitle);//set to initial position before caculation
            textAnimationInitialize(animatedTitle,lastTitle,nextTitle);
        }
    });

    $(window).scroll(function(){
        for (var i = 0; i < animateTitleArray.length; i++){
            var animatedTitle = animateTitleArray[i];
            var lastTitle = animateTitleArray[i-1];
            var nextTitle = animateTitleArray[i+1];
            titleStates(animatedTitle,lastTitle,nextTitle);
        }
    });
});//Window load END


function textAnimationInitialize(animatedTitle,lastTitle,nextTitle){
    var targetPosElement =  document.getElementById(animatedTitle.getAttribute('data-target-element'));
    var animatedTitleParent = $(animatedTitle).parent('p');
    var firstTextSpan = animatedTitleParent.find('.textSpan:first-child');
    var firstTextSpanPos = firstTextSpan.offset();
    var lastWord = firstTextSpan.find('.word:last-child');
    var lastWordPos = $(lastWord).offset();
    var animatedTitleTop = lastWordPos.top + $(lastWord).height();//because inline-block top is based on last element top
    animatedTitle.animatedTitleTop = animatedTitleTop;

    // CACULATE paraScroll Distance
    var paraScrollDistance = caculateParaScrollDistance();
    function caculateParaScrollDistance(){
        var sectionDiv = $(animatedTitle).parents('div.content');
        if(sectionDiv[0] == null){
            sectionDiv = $(animatedTitle).parents('#videoBG');
            // console.log(sectionDiv);
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
        // paraScrollDistance = 100;
        return paraScrollDistance;
    }
    animatedTitle.paraScrollDistance = paraScrollDistance;

    if(targetPosElement != null){//check if there are next Target Title Position OTHERWISE just get animatedTitleTop to for text paragraph scroll
        insertTitleToTarget();
        function insertTitleToTarget(){
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
        // animatedTitle.consoleElement = stopDistance;

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
            // animatedTitle.lastWordMarginLeft = lastWordMarginLeft;
            animatedTitle.firstWord = firstWord;
        }
    }

    getTextParaScrollSpeed();
    function getTextParaScrollSpeed(){
        animatedTitle.TextParaScrollSpeed = paraScrollDistance / ( paraScrollDistance + scrollTextParaOffset);
    }
    animatedTitle.consoleElement = paraScrollDistance;
    // titleStates();//TODO Fix already scrolled.

    setCurrentState();
    function setCurrentState(){
        var currentScroll = $(document).scrollTop();
        var animatedTitleCurrentTop = animatedTitleTop - currentScroll;
        var paraTotalDistance = paraScrollDistance+scrollTextParaOffset;

        var titleCanAnimate = animatedTitleCurrentTop <= detectionDistance + scrollTextParaOffset;
        var titleCompleteAnimate = animatedTitleCurrentTop <= (detectionDistance - paraScrollDistance);
        
        if(titleCompleteAnimate){
            textParaScroll(animatedTitle,paraTotalDistance,lastTitle);
            setTextProgressingPosition(animatedTitle,animateDistance);
        }else if(titleCanAnimate){
            textParaScroll(animatedTitle,paraTotalDistance,lastTitle);
        }else{
            textParaScroll(animatedTitle,0,lastTitle);
        }

        if(typeof lastTitle !== 'undefined'){
            var lastTitleTargetTop = lastTitle.targetFixedTop - currentScroll; //this is the lastTitle's targetTop
        }

        var imgShow = animatedTitleCurrentTop >= (detectionDistance - paraScrollDistance) && lastTitleTargetTop <= stopDistance;
        // console.log(lastTitle);
        var imgAtTop = lastTitleTargetTop <= stopDistance && !imgShow;
        var imgAtBottom = animatedTitleCurrentTop >= (detectionDistance - paraScrollDistance) && !imgShow;
        if(imgAtTop){
            // console.log(imgAtTop);
            // setContentImage(animatedTitle,-imgTransformDistance,imgFadeOpacity);
            setImageTransform(animatedTitle,-imgTransformDistance,imgFadeOpacity,0);
        }else if(imgAtBottom){
            // setContentImage(animatedTitle,imgTransformDistance,imgFadeOpacity);
            setImageTransform(animatedTitle,imgTransformDistance,imgFadeOpacity,0);
        }
    }
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


function titleStates(animatedTitle,lastTitle,nextTitle){
    var paraScrollDistance = animatedTitle.paraScrollDistance;
    var currentScroll = $(document).scrollTop();
    // var textParaScrolledDistance = TextParaScrollSpeed * 
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

    // PARA START POSITION
    // ======set position to where paragraph should be when scroll back
    if(paraLastFrameProgress >= 0 && paraScrollProgress < 0 ){
        textParaScroll(animatedTitle,0,lastTitle);
    }
    // PARA FINAL POSITION
    // ======set position to where para should be at finnal position
    if(paraLastFrameProgress <= scrollFullDistance && paraScrollProgress > scrollFullDistance){
        textParaScroll(animatedTitle,scrollFullDistance,lastTitle);
        if(typeof nextTitle != 'undefined'){
            // console.log(nextTitle);
            setImageTransform(animatedTitle,-imgTransformDistance,imgFadeOpacity,0.5);
        }
        
        
    }
    // TITLE START POSITION
    // ======set position to where title was not scrolled
    if(titleLastFrameProgress >= 0 && titleCurrentProgress < 0){
        setTextInitialPosition(animatedTitle);
        setImageTransform(animatedTitle,0,1,0.5);
        // console.log('TITLE START POSITION');
    }
    // TITLE FINAL POSITION
    // ======set position to where title should be at finnal position
    if(titleLastFrameProgress <= animateDistance && titleCurrentProgress > animateDistance){
        setTextProgressingPosition(animatedTitle,animateDistance);
        setImageTransform(nextTitle,0,1,0.5);
    }

    // TITLE FINAL POSITION OPPOSITE DIRECTION
    // ======leave the final position
    if(titleLastFrameProgress >= animateDistance && titleCurrentProgress < animateDistance){
        setTextProgressingPosition(animatedTitle,animateDistance);
        setImageTransform(nextTitle,imgTransformDistance,imgFadeOpacity,0.5);
    }


    if(startAnimateTitle){
        setTextProgressingPosition(animatedTitle,titleCurrentProgress);
    }else if(startScrollTextPara){
        textParaScroll(animatedTitle,paraScrollProgress,lastTitle);
    }
// caculate last frame progress
    animatedTitle.paraLastFrameProgress = paraScrollProgress;   
    animatedTitle.titleLastFrameProgress = titleCurrentProgress; 
}





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


// =========SET EVERYTHING TO INITIAL POSITION=========
// =========Need this because all properties are caculated based on the initial stats
function setTextInitialPosition(animatedTitle){
    var animatedTitleParent = $(animatedTitle).parent('p');
    var titleCurrentProgress = 0;
    var firstWord = animatedTitle.firstWord;
    // lastWordMarginLeft = animatedTitle.lastWordMarginLeft;
    animatedTitleParent.css({
        'transform':'translate( ' + 0 +'px, ' + 0 + 'px)'
    });

    $(animatedTitle).css({
        // 'color':'rgb(' + textNextColor + ','+ textNextColor + ',' + textNextColor + ')',
        'transform':'translate( ' + 0 +'px, ' + 0 + 'px)',
        'font-family':textBaseFontFamily,
        'font-size': textBaseFontSize + titleCurrentProgress + 'px',
        'margin-left': 0 + 'px',
        'position':'inherit',
        'display': 'inline',
        'top': 0 + 'px'
        // 'letter-spacing': letterSpacingBase +TargettitleCurrentProgress/letterSpacingShrink,
    });

    $(firstWord).css({
        'margin-left': lastWordMarginLeft + 'px'
    });
}


function setTextProgressingPosition(animatedTitle,titleCurrentProgress){
    // console.log(animatedTitle.consoleElement);
    // TRANSFORM
    var transformSpeedX = animatedTitle.transformSpeedX;
    var transformSpeedY = animatedTitle.transformSpeedY;
    var textNextPositionX = globalSpeed * transformSpeedX * titleCurrentProgress;
    var textNextPositionY = globalSpeed * transformSpeedY * titleCurrentProgress;

    // INNEROFFSET
    var firstWord = animatedTitle.firstWord;
    // lastWordMarginLeft = animatedTitle.lastWordMarginLeft;
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
    // console.log(textNextPositionY);
    // console.log(lastTitle);
}


function contentDivSetter(){
    var windowW = $(window).width();
    var windowH = $(window).height();
    var contentDivHeight = 9/16 * windowW;
    if(windowH < contentDivHeight){//videoBG should be at least as tall as the content div to ensure the text animation
        $('#videoBG').css({
            'height': contentDivHeight + 'px'
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
    // console.log(textBaseFontSize);
}


function textToSpan(){
    var paragraphSections = $(".smallText p .textSpan");
    for(i = 0; i < paragraphSections.length; i++){
        paragraphSection = paragraphSections[i];
        if(paragraphSection != null){
            // console.log(paragraphSection);
            var words = $(paragraphSection).text().split(" ");
            $(paragraphSection).empty();
            $.each(words, function(i, v) {
                $(paragraphSection).append($("<span class='word'>").text(v));
            });
        }
    }
    var wordElement = $(paragraphSections[0]).find('.word:first-child');
    lastWordMarginLeft = parseInt(wordElement.css('margin-left'));
    // console.log(lastWordMarginLeft);
}

