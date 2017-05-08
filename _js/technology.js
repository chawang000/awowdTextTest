var techSections = [];

$(window).on("load", function (e){
	// $('#techSectionOne').click(expandContent);
	techSections = document.getElementsByClassName("techDisplay");
	 for (var i = 0; i < techSections.length; i++){
	 	techPageSectionInit(techSections[i]);
	 }

	$(window).resize(function(){
		for (var i = 0; i < techSections.length; i++){
			techPageSectionResize(techSections[i])
		}
    });
});


function techPageSectionInit(techSection){
	// var $('.techTextContent').css('height');
	// console.log(techSection);

	var hiddingPara = $(techSection).find('.hiddingPara');
	var additionalDisplay = $(techSection).find('.additionalDisplay');
	var additionalContent = $(techSection).find('.additionalWrapper');
	var hiddingPara = $(techSection).find('.hiddingPara');
	var expandButton = $(techSection).find('.showMoreButton');
	var shrinkButton = $(techSection).find('.showLessButton');
	techSection.sectionInfo = {
		expanded:false,
		fullHeight: 0,
		zipHeight: 0
	}

	// console.log(sectionInfo.fullHeight);
	
//set heights
	// additionalDisplay.css({
	// 	'height':sectionInfo.zipHeight
	// });


// BOUND EXPAND BUTTONS
	if(expandButton.length !=0) {
		var expandButtonText = expandButton.find('p');
		var shrinkButtonText = shrinkButton.find('p');
		expandButtonText[0].addEventListener('click', expandContent,false);
		shrinkButtonText[0].addEventListener('click', shrinkContent,false);
	}

	function expandContent(){
		techSection.sectionInfo = {
			expanded:true,
			fullHeight: additionalContent.height()-shrinkButton.outerHeight(),
			zipHeight: shrinkButton.outerHeight()
		}

		hiddingAnimation(additionalDisplay,additionalContent,hiddingPara,techSection.sectionInfo.fullHeight,-techSection.sectionInfo.zipHeight,1);

	}

	function shrinkContent(){
		techSection.sectionInfo = {
			expanded:false,
			fullHeight: additionalContent.height()-shrinkButton.outerHeight(),
			zipHeight: shrinkButton.outerHeight()
		}
		hiddingAnimation(additionalDisplay,additionalContent,hiddingPara,techSection.sectionInfo.zipHeight,0,0);
	}
}

function hiddingAnimation(additionalDisplay,additionalContent,hiddingPara,displayHeight,topPosition,opacity){
	additionalDisplay.stop(true,true).animate({
		'height':displayHeight
	},700,'easeOutQuart');

	additionalContent.stop(true,true).animate({
		'top':topPosition
	},700,'easeOutQuart');

	hiddingPara.stop(true,true).animate({
		'opacity':opacity
	},700,'easeOutQuart');

	if(opacity == 0){
		additionalContent[0].scrollIntoView(true);
	}
	
}



// TECH SECTION RESIZE
function techPageSectionResize(techSection){
	var additionalContent = $(techSection).find('.additionalWrapper');
	var additionalDisplay = $(techSection).find('.additionalDisplay');
	var shrinkButton = $(techSection).find('.showLessButton');

	if(techSection.sectionInfo.expanded){
		var fullHeight = additionalContent.height()-shrinkButton.outerHeight();
		additionalDisplay.css({
			'height':fullHeight
		});
	}
}








