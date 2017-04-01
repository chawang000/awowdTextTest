var detectionDistance = 200,
    stopDistance = 300,
    scrollTextParaOffset = 400, //this is how many px before detectionDistance that trigger the paragraph scroll
    paraScrollDistance = 100, //TODO caculate automatically
    textBaseFontSize = 30,
    textTargetFontSize = 60,
    globalSpeed = 1;

var lastWordMarginLeft;


// SPEED VARIABLES

$(document).ready(function(){
    
});

$(window).on("load", function (e){
    
    animateTitleArray = document.getElementsByClassName("animatedTitle");
    textToSpan();

    for (var i = 0; i < animateTitleArray.length; i++){
        var animatedTitle = animateTitleArray[i];
        setTextInitialPosition(animatedTitle);
        textAnimationInitialize(animatedTitle);
    }

    $(window).resize(function(){
        for (var i = 0; i < animateTitleArray.length; i++){
            var animatedTitle = animateTitleArray[i];
            setTextInitialPosition(animatedTitle);
            textAnimationInitialize(animatedTitle);
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



function textAnimationInitialize(animatedTitle){
        var targetPosElement =  document.getElementById(animatedTitle.getAttribute('data-target-element'));
        if(targetPosElement != null){
            var animatedTitleParent = $(animatedTitle).parent('p');
            // var animatedTitlePosition = $(animatedTitle).offset();
            var titleParentPos = animatedTitleParent.offset();
            var firstTextSpan = animatedTitleParent.find('.textSpan:first-child');
            var firstTextSpanPos = firstTextSpan.offset();
            var firstWord = $(animatedTitle).find('.word')[0];
            var lastWord = firstTextSpan.find('.word:last-child');
            var targetPos = $(targetPosElement).offset();
            var firstWordPos = $(firstWord).offset();
            var lastWordPos = $(lastWord).offset();


            var animatedTitleTop = lastWordPos.top + $(lastWord).height();//because inline-block top is based on last element top
            var targetTop = targetPos.top;

            animateDistance = targetTop - stopDistance - animatedTitleTop + detectionDistance - paraScrollDistance;
            // animatedTitle.consoleElement = stopDistance;

            animatedTitle.targetFixedTop = targetTop;
            animatedTitle.animatedTitleTop = animatedTitleTop;
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

        animatedTitle.consoleElement = innerOffsetDistanceX;

        // if ("undefined" === typeof animatedTitle.hasOwnProperty()){
        //     console.log(animatedTitle.prop);
        // }

        // titleStates();//TODO Fix already scrolled.
}


function titleStates(animatedTitle,lastTitle){
            // console.log(animatedTitle.consoleElement);
            var currentScroll = $(document).scrollTop();
            // var textParaScrolledDistance = TextParaScrollSpeed * 
            var animatedTitleCurrentTop = animatedTitle.animatedTitleTop - currentScroll;
            var targetPosElement = animatedTitle.targetPosElement;
            var targetTop = animatedTitle.targetFixedTop - currentScroll;
            var animateDistance = animatedTitle.animateDistance;


            var currentProgress = animateDistance - (targetTop - stopDistance);
            var startAnimateTitle = canAnimateTitle(animatedTitleCurrentTop, targetTop);

            var scrollFullDistance = paraScrollDistance + scrollTextParaOffset;
            var textScrollProgress = scrollFullDistance - (animatedTitleCurrentTop - detectionDistance + paraScrollDistance);
            var startScrollTextPara = canScrollTextPara(animatedTitleCurrentTop);

            // if(canInitialTitle){
            //     setTextInitialPosition(animatedTitle);
            // }

            if(startAnimateTitle){
                setTextProgressingPosition(animatedTitle,currentProgress);
                // console.log($(animatedTitle));
            }else if(startScrollTextPara){
                // console.log($(animatedTitle));
                textParaScroll(animatedTitle,textScrollProgress,lastTitle);
            }
}

// function canInitialTitle(){
//     if(animatedTitleCurrentTop > detectionDistance ){
//         return true;
//     }
// }

function canScrollTextPara(animatedTitleCurrentTop){
    if(animatedTitleCurrentTop >= (detectionDistance - paraScrollDistance) && animatedTitleCurrentTop <= detectionDistance + scrollTextParaOffset){
        return true;
    }
}

function canAnimateTitle(animatedTitleCurrentTop, targetTop){
    if(animatedTitleCurrentTop < (detectionDistance - paraScrollDistance)  && targetTop > stopDistance){
        return true;
    }
}

function setTextInitialPosition(animatedTitle){
    var currentProgress = 0;
    var firstWord = animatedTitle.firstWord;
    // lastWordMarginLeft = animatedTitle.lastWordMarginLeft;
    $(animatedTitle).css({
                        // 'color':'rgb(' + textNextColor + ','+ textNextColor + ',' + textNextColor + ')',
                        'transform':'translate( ' + 0 +'px, ' + 0 + 'px)',
                        // 'font-family':'Avenir Next LT Pro Bold',
                        'font-size': textBaseFontSize + currentProgress + 'px',
                        'margin-left': 0 + 'px',
                        'position':'inherit',
                        'display': 'inline',
                        'top': 0 + 'px'
                        // 'letter-spacing': letterSpacingBase +TargetCurrentProgress/letterSpacingShrink,
                    });
    $(firstWord).css({
        'margin-left': lastWordMarginLeft + 'px'
    });
}

// function setTitleFinalPosition(){
//     var currentProgress = animateDistance;
//     var firstWord = animatedTitle.firstWord;
//     // lastWordMarginLeft = animatedTitle.lastWordMarginLeft;
//     transformSpeedX = animatedTitle.transformSpeedX;
//     transformSpeedY = animatedTitle.transformSpeedY;
//     textNextPositionX = globalSpeed * transformSpeedX * currentProgress;
//     textNextPositionY = globalSpeed * transformSpeedY * currentProgress;

//     // INNEROFFSET
//     var firstWord = animatedTitle.firstWord;
//     // lastWordMarginLeft = animatedTitle.lastWordMarginLeft;
//     innerOffsetSpeedX = animatedTitle.innerOffsetSpeedX;
//     innerOffsetSpeedY = animatedTitle.innerOffsetSpeedY;
//     animateDistance = animatedTitle.animateDistance;
//     textNestOffsetX = globalSpeed * innerOffsetSpeedX * (animateDistance - currentProgress);
//     textNestOffsetY = -1 * globalSpeed * innerOffsetSpeedY * (animateDistance - currentProgress);



//     textFontSizeSpeed = globalSpeed * animatedTitle.textFontSizeSpeed;

//     $(animatedTitle).css({
//                         // 'color':'rgb(' + textNextColor + ','+ textNextColor + ',' + textNextColor + ')',
//                         'transform':'translate( ' + textNextPositionX +'px, ' + textNextPositionY + 'px)',
//                         // 'font-family':'Avenir Next LT Pro Bold',
//                         'font-size': textBaseFontSize + currentProgress * textFontSizeSpeed + 'px',
//                         'position':'relative',
//                         'display': 'inline-block',
//                         'top': textNestOffsetY + 'px'
//                         // 'letter-spacing': letterSpacingBase +TargetCurrentProgress/letterSpacingShrink,
//                     });
// }

function setTextProgressingPosition(animatedTitle,currentProgress){
    // console.log(animatedTitle.consoleElement);
    // TRANSFORM
    var transformSpeedX = animatedTitle.transformSpeedX;
    var transformSpeedY = animatedTitle.transformSpeedY;
    var textNextPositionX = globalSpeed * transformSpeedX * currentProgress;
    var textNextPositionY = globalSpeed * transformSpeedY * currentProgress;

    // INNEROFFSET
    var firstWord = animatedTitle.firstWord;
    // lastWordMarginLeft = animatedTitle.lastWordMarginLeft;
    var innerOffsetSpeedX = animatedTitle.innerOffsetSpeedX;
    var innerOffsetSpeedY = animatedTitle.innerOffsetSpeedY;
    var animateDistance = animatedTitle.animateDistance;
    var textNestOffsetX = globalSpeed * innerOffsetSpeedX * (animateDistance - currentProgress);
    var textNestOffsetY = -1 * globalSpeed * innerOffsetSpeedY * (animateDistance - currentProgress);



    var textFontSizeSpeed = globalSpeed * animatedTitle.textFontSizeSpeed;

    $(animatedTitle).css({
                        // 'color':'rgb(' + textNextColor + ','+ textNextColor + ',' + textNextColor + ')',
                        'transform':'translate( ' + textNextPositionX +'px, ' + textNextPositionY + 'px)',
                        // 'font-family':'Avenir Next LT Pro Bold',
                        'font-size': textBaseFontSize + currentProgress * textFontSizeSpeed + 'px',
                        'position':'relative',
                        'display': 'inline-block',
                        'top': textNestOffsetY + 'px'
                        // 'letter-spacing': letterSpacingBase +TargetCurrentProgress/letterSpacingShrink,
                    });


    $(firstWord).css({
        'margin-left': lastWordMarginLeft + textNestOffsetX + 'px'
    });
}


function textParaScroll(animatedTitle,textScrollProgress,lastTitle){
    var TextParaScrollSpeed = animatedTitle.TextParaScrollSpeed;
    var animatedTitleParent = $(animatedTitle).parent('p');

    animatedTitleParent.css({
        'transform':'translate( ' + 0 +'px, ' + textScrollProgress * TextParaScrollSpeed + 'px)'
    });

    if(typeof lastTitle !== 'undefined'){
        $(lastTitle).css({
            'transform':'translate( ' + (lastTitle.transformSpeedX*lastTitle.animateDistance) +'px, ' + (lastTitle.transformSpeedY*lastTitle.animateDistance+textScrollProgress * TextParaScrollSpeed) + 'px)'
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

