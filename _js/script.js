var detectionDistance = 200,
    stopDistance = 400,
    scrollTextParaOffset = 300, //this is how many px before detectionDistance that trigger the paragraph scroll
    textBaseFontSize = 30,
    textTargetFontSize = 60,
    globalSpeed = 1;

var lastWordMarginLeft,
    paraLastFrameProgress,
    titleLastFrameProgress;


// SPEED VARIABLES

$(document).ready(function(){
    
});

$(window).on("load", function (e){
    
    animateTitleArray = document.getElementsByClassName("animatedTitle");
    textToSpan();

    for (var i = 0; i < animateTitleArray.length; i++){
        var animatedTitle = animateTitleArray[i];
        textAnimationInitialize(animatedTitle);
    }

    $(window).resize(function(){
        for (var i = 0; i < animateTitleArray.length; i++){
            var animatedTitle = animateTitleArray[i];
            var lastTitle = animateTitleArray[i-1];
            setTextInitialPosition(animatedTitle);//set to initial position before caculation
            textAnimationInitialize(animatedTitle,lastTitle);
        }
    });

    $(window).scroll(function(){
        for (var i = 0; i < animateTitleArray.length; i++){
            var animatedTitle = animateTitleArray[i];
            var lastTitle = animateTitleArray[i-1];
            titleStates(animatedTitle,lastTitle);
        }
    });
});//Window load END



function textAnimationInitialize(animatedTitle,lastTitle){
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
            if(sectionDiv == null){
                sectionDiv = $(animatedTitle).parents('div#videoBG');
            }
            var sectionBottom = sectionDiv.offset().top + sectionDiv.height();

            var textArea = $(animatedTitle).parents('.textArea');
            var textAreaBottom = textArea.offset().top + textArea.height();

            var paraScrollDistance = (sectionBottom - textAreaBottom) * 0.7;
            if (paraScrollDistance <= 0) {
                paraScrollDistance = 0;
            }else if(paraScrollDistance > 300){
                paraScrollDistance = 300
            }
            return paraScrollDistance;
        }

        
        animatedTitle.paraScrollDistance = paraScrollDistance;


        if(targetPosElement != null){//check if there are next Target Title Position OTHERWISE just get animatedTitleTop to for text paragraph scroll
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

        // if ("undefined" === typeof animatedTitle.hasOwnProperty()){
        //     console.log(animatedTitle.prop);
        // }

        // titleStates();//TODO Fix already scrolled.
        setCurrentState();
        function setCurrentState(){
            var currentScroll = $(document).scrollTop();
            var animatedTitleCurrentTop = animatedTitleTop - currentScroll;
            var paraTotalDistance = paraScrollDistance+scrollTextParaOffset;
            if(animatedTitleCurrentTop <= (detectionDistance - paraScrollDistance)){
                textParaScroll(animatedTitle,paraTotalDistance,lastTitle);
                setTextProgressingPosition(animatedTitle,animateDistance);
            }else if(animatedTitleCurrentTop <= detectionDistance + scrollTextParaOffset){
                textParaScroll(animatedTitle,paraTotalDistance,lastTitle);
            }else{
                textParaScroll(animatedTitle,0,lastTitle);
            }

        }

}



function titleStates(animatedTitle,lastTitle){
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
    // console.log(animatedTitleCurrentTop);

    // PARA START POSITION
    // ======set position to where paragraph should be when scroll back
    if(paraLastFrameProgress >= 0 && paraScrollProgress < 0 ){
        // console.log('Para Start Position');
        textParaScroll(animatedTitle,0,lastTitle);
    }
    // PARA FINAL POSITION
    // ======set position to where para should be at finnal position
    if(paraLastFrameProgress <= scrollFullDistance && paraScrollProgress > scrollFullDistance){
        // console.log('Para Final Position');
        textParaScroll(animatedTitle,scrollFullDistance,lastTitle);
    }
    // TITLE START POSITION
    // ======set position to where title was not scrolled
    if(titleLastFrameProgress >= 0 && titleCurrentProgress < 0){
        // console.log('Title Start Position');
        setTextProgressingPosition(animatedTitle,0);
    }
    // TITLE FINAL POSITION
    // ======set position to where title should be at finnal position
    if(titleLastFrameProgress <= animateDistance && titleCurrentProgress > animateDistance){
        // console.log('Title Final Position');
        setTextProgressingPosition(animatedTitle,animateDistance);
    }



    if(startAnimateTitle){
        setTextProgressingPosition(animatedTitle,titleCurrentProgress);
        // console.log(paraLastFrameProgress);
    }else if(startScrollTextPara){
        // console.log($(animatedTitle));
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
    // console.log(paraScrollDistance);
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
        // 'font-family':'Avenir Next LT Pro Bold',
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

// function setTitleFinalPosition(){
//     var titleCurrentProgress = animateDistance;
//     var firstWord = animatedTitle.firstWord;
//     // lastWordMarginLeft = animatedTitle.lastWordMarginLeft;
//     transformSpeedX = animatedTitle.transformSpeedX;
//     transformSpeedY = animatedTitle.transformSpeedY;
//     textNextPositionX = globalSpeed * transformSpeedX * titleCurrentProgress;
//     textNextPositionY = globalSpeed * transformSpeedY * titleCurrentProgress;

//     // INNEROFFSET
//     var firstWord = animatedTitle.firstWord;
//     // lastWordMarginLeft = animatedTitle.lastWordMarginLeft;
//     innerOffsetSpeedX = animatedTitle.innerOffsetSpeedX;
//     innerOffsetSpeedY = animatedTitle.innerOffsetSpeedY;
//     animateDistance = animatedTitle.animateDistance;
//     textNestOffsetX = globalSpeed * innerOffsetSpeedX * (animateDistance - titleCurrentProgress);
//     textNestOffsetY = -1 * globalSpeed * innerOffsetSpeedY * (animateDistance - titleCurrentProgress);



//     textFontSizeSpeed = globalSpeed * animatedTitle.textFontSizeSpeed;

//     $(animatedTitle).css({
//                         // 'color':'rgb(' + textNextColor + ','+ textNextColor + ',' + textNextColor + ')',
//                         'transform':'translate( ' + textNextPositionX +'px, ' + textNextPositionY + 'px)',
//                         // 'font-family':'Avenir Next LT Pro Bold',
//                         'font-size': textBaseFontSize + titleCurrentProgress * textFontSizeSpeed + 'px',
//                         'position':'relative',
//                         'display': 'inline-block',
//                         'top': textNestOffsetY + 'px'
//                         // 'letter-spacing': letterSpacingBase +TargettitleCurrentProgress/letterSpacingShrink,
//                     });
// }


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
                        // 'font-family':'Avenir Next LT Pro Bold',
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

