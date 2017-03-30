var detectionDistance = 300,
    stopDistance = 300,
    textBaseFontSize = 30,
    textTargetFontSize = 60,
    globalSpeed = 1;

var lastWordMarginLeft;


// SPEED VARIABLES



$(window).on("load", function (e){
    animateTitleArray = document.getElementsByClassName("animatedTitle");
    textToSpan();

    for (var i = 0; i < animateTitleArray.length; i++){
        animatedTitle = animateTitleArray[i];
        setTextInitialPosition(animatedTitle);
        textAnimationInitialize(animatedTitle);
    }
    

    $(window).resize(function(){
        for (var i = 0; i < animateTitleArray.length; i++){
            animatedTitle = animateTitleArray[i];
            setTextInitialPosition(animatedTitle);
            textAnimationInitialize(animatedTitle);
        }
    });

    $(window).scroll(function(){
        for (var i = 0; i < animateTitleArray.length; i++){
            animatedTitle = animateTitleArray[i];
            titleStates(animatedTitle);
        }
    });

});//Window load END



function textAnimationInitialize(){
        targetPosElement =  document.getElementById(animatedTitle.getAttribute('data-target-element'));
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

        animateDistance = targetTop - stopDistance - animatedTitleTop + detectionDistance;
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
            transformDistanceY = targetPos.top - animatedTitleTop;
            animatedTitle.transformSpeedX = transformDistanceX / animateDistance;
            animatedTitle.transformSpeedY = transformDistanceY / animateDistance;

            innerOffsetDistanceX = firstWordPos.left - titleParentPos.left - lastWordMarginLeft;
            innerOffsetDistanceY = lastWordPos.top - firstWordPos.top + $(firstWord).height();
            animatedTitle.innerOffsetSpeedX = innerOffsetDistanceX / animateDistance;
            animatedTitle.innerOffsetSpeedY = innerOffsetDistanceY / animateDistance;
            // animatedTitle.lastWordMarginLeft = lastWordMarginLeft;
            animatedTitle.firstWord = firstWord;
        }

        animatedTitle.consoleElement = transformDistanceY;

        titleStates();//TODO Fix already scrolled.
}



function titleStates(){
            var currentScroll = $(document).scrollTop();
            var animatedTitleCurrentTop = animatedTitle.animatedTitleTop - currentScroll;
            targetPosElement = animatedTitle.targetPosElement;
            var targetTop = animatedTitle.targetFixedTop - currentScroll;
            animateDistance = animatedTitle.animateDistance;

            currentProgress = animateDistance - (targetTop - stopDistance);

            startAnimateTitle = canAnimateTitle(animatedTitleCurrentTop, targetTop);

            // if(canInitialTitle){
            //     setTextInitialPosition(animatedTitle);
            // }

            if(startAnimateTitle){
                // setTextProgressingPosition(animatedTitle,currentProgress);
            }
        
}

// function canInitialTitle(){
//     if(animatedTitleCurrentTop > detectionDistance ){
//         return true;
//     }
// }

function canAnimateTitle(animatedTitleCurrentTop, targetTop){
    if(animatedTitleCurrentTop < detectionDistance && targetTop > stopDistance){
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

function setTextProgressingPosition(animatedTitle, currentProgress){
    // console.log(animatedTitle.consoleElement);
    // TRANSFORM
    transformSpeedX = animatedTitle.transformSpeedX;
    transformSpeedY = animatedTitle.transformSpeedY;
    textNextPositionX = globalSpeed * transformSpeedX * currentProgress;
    textNextPositionY = globalSpeed * transformSpeedY * currentProgress;

    // INNEROFFSET
    var firstWord = animatedTitle.firstWord;
    // lastWordMarginLeft = animatedTitle.lastWordMarginLeft;
    innerOffsetSpeedX = animatedTitle.innerOffsetSpeedX;
    innerOffsetSpeedY = animatedTitle.innerOffsetSpeedY;
    animateDistance = animatedTitle.animateDistance;
    textNestOffsetX = globalSpeed * innerOffsetSpeedX * (animateDistance - currentProgress);
    textNestOffsetY = -1 * globalSpeed * innerOffsetSpeedY * (animateDistance - currentProgress);



    textFontSizeSpeed = globalSpeed * animatedTitle.textFontSizeSpeed;

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
    wordElement = $(paragraphSections[0]).find('.word:first-child');
    lastWordMarginLeft = parseInt(wordElement.css('margin-left'));
    // console.log(lastWordMarginLeft);
}

