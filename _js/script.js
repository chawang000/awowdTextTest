var detectionDistance = 400,
    stopDistance = 400,
    textBaseFontSize = 30,
    textTargetFontSize = 60,
    globalSpeed = 1;


// SPEED VARIABLES



$(window).on("load", function (e){
    animateTitleArray = document.getElementsByClassName("animatedTitle");
    textToSpan();
    textAnimationInitialize();

    $(window).resize(function(){
        textAnimationInitialize();
    });

    $(window).scroll(function(){
        titleStates();
    });

});//Window load END



function textAnimationInitialize(){
    for (var i = 0; i < animateTitleArray.length; i++){
        var animatedTitle = animateTitleArray[i];

        setTextInitialPosition(animatedTitle);

        targetPosElement =  document.getElementById(animatedTitle.getAttribute('data-target-element'));
        var animatedTitleParent = $(animatedTitle).parent('p');
        // var animatedTitlePosition = $(animatedTitle).offset();
        var titleParentPos = animatedTitleParent.offset();
        var firstWord = $(animatedTitle).find('.word')[0];
        var lastWord = $(animatedTitle).find('.word:last-child');
        var targetPos = $(targetPosElement).offset();
        var firstWordPos = $(firstWord).offset();
        var lastWordPos = $(lastWord).offset();
        var lastWordMarginLeft = 10;

        var animatedTitleTop = lastWordPos.top;//because inline-block top is based on last element top
        var targetTop = targetPos.top;

        animateDistance = (targetTop - stopDistance - animatedTitleTop + detectionDistance);
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
            transformDistanceY = targetPos.top - lastWordPos.top;
            animatedTitle.transformSpeedX = transformDistanceX / animateDistance;
            animatedTitle.transformSpeedY = transformDistanceY / animateDistance;

            innerOffsetDistanceX = firstWordPos.left - titleParentPos.left - lastWordMarginLeft;
            innerOffsetDistanceY = lastWordPos.top - firstWordPos.top;
            animatedTitle.innerOffsetSpeedX = innerOffsetDistanceX / animateDistance;
            animatedTitle.innerOffsetSpeedY = innerOffsetDistanceY / animateDistance;
            animatedTitle.lastWordMarginLeft = lastWordMarginLeft;
            animatedTitle.firstWord = firstWord;
        }

        animatedTitle.consoleElement = lastWordMarginLeft;

        titleStates();//TODO Fix already scrolled.
    }
}



function titleStates(){
        for (var i = 0; i < animateTitleArray.length; i++){
            var animatedTitle = animateTitleArray[i];
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
                setTextProgressingPosition(animatedTitle,currentProgress);
            }
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
    lastWordMarginLeft = animatedTitle.lastWordMarginLeft;
    $(animatedTitle).css({
                        // 'color':'rgb(' + textNextColor + ','+ textNextColor + ',' + textNextColor + ')',
                        'transform':'translate( ' + 0 +'px, ' + 0 + 'px)',
                        // 'font-family':'Avenir Next LT Pro Bold',
                        'font-size': textBaseFontSize + currentProgress + 'px',
                        'margin-top': lastWordMarginLeft + 'px',
                        'display': 'inline'
                        // 'letter-spacing': letterSpacingBase +TargetCurrentProgress/letterSpacingShrink,
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
    lastWordMarginLeft = animatedTitle.lastWordMarginLeft;
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

                        'display': 'inline-block',
                        'margin-top': textNestOffsetY + 'px'
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
}

