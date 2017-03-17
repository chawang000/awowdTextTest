var detectionDistance = 300,
    stopDistance = 300,
    textBaseFontSize = 30,
    textTargetFontSize = 60,
    globalSpeed = 1;

var currentProgress;

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
        animatedTitle.targetPosElement =  document.getElementById(animatedTitle.getAttribute('data-target-element'));
        targetPosElement = animatedTitle.targetPosElement;
        var animatedTitleParent = $(animatedTitle).parent('p');
        var animatedTitleParentHeight = animatedTitleParent.height();
        var titleParentPos = animatedTitleParent.offset();
        // var animatedTitlePosition = $(animatedTitle).offset();
        var animatedTitleHeight = $(animatedTitle).height();

        var animatedTitleTop = titleParentPos.top + animatedTitleParentHeight -animatedTitleHeight;
        var targetPos = $(targetPosElement).offset();
        var targetTop = targetPos.top;

        // console.log(animatedTitleHeight);

        animateDistance = targetTop - animatedTitleTop;
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
        }
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

            // console.log(animatedTitle.targetFixedTop);

            currentProgress = animateDistance - (targetTop - stopDistance);

            startAnimateTitle = canAnimateTitle(animatedTitleCurrentTop, targetTop);
            if(startAnimateTitle){
                // console.log(currentProgress);
                setTextProgressingPosition(animatedTitle);
                // console.log(animatedTitle.transformSpeedX);
            }
        }
}

function canAnimateTitle(animatedTitleCurrentTop, targetTop){

    if(animatedTitleCurrentTop < detectionDistance && targetTop > stopDistance){
        return true;
    }else{
        // return false;
    }
}

// function

function setTextProgressingPosition(animatedTitle){
     transformSpeedX = animatedTitle.transformSpeedX;
    // console.log(currentProgress);
    transformSpeedX = animatedTitle.transformSpeedX;
    transformSpeedY = animatedTitle.transformSpeedY
    textFontSizeSpeed = globalSpeed * animatedTitle.textFontSizeSpeed;
    textNextPositionX = globalSpeed * transformSpeedX * currentProgress;
    textNextPositionY = globalSpeed * transformSpeedY * currentProgress;

    $(animatedTitle).css({
                        // 'color':'rgb(' + textNextColor + ','+ textNextColor + ',' + textNextColor + ')',
                        'transform':'translate( ' + textNextPositionX +'px, ' + textNextPositionY + 'px)',
                        // 'font-family':'Avenir Next LT Pro Bold',
                        'font-size': textBaseFontSize + currentProgress * textFontSizeSpeed + 'px',
                        // 'margin-top':'-100px',
                        // 'display': 'block'
                        // 'letter-spacing': letterSpacingBase +TargetCurrentProgress/letterSpacingShrink,
                    });
    // console.log($(animateElement).css('color'));
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

