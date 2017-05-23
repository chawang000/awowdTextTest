$(document).ready(function(){
});

var allShapes,
	shapesInfo,
	allPolyline;


function initializeDeerData(){
	allShapes = $('svg #shapes polygon');
	shapesInfo = [];
	allPolyline = $('svg #shapes polyline');
	for(var i = 0; i < allShapes.length; i++){
		var opacity = $('.'+allShapes[i].className.baseVal).css('opacity');
		var shapeTargetX = (Math.random()-0.2)*30;
		var shapeTargetY = (Math.random()-0.7)*50;
		shapesInfo.push({
			shapePosition:allShapes[i].getAttribute('points').split(' '),
			shapeOpacity:opacity,
			targetX:shapeTargetX,
			targetY:shapeTargetY
		});
	}
	$('#homeSection_2 .contentImage svg').on('mouseenter',deerOut);
	$('#homeSection_2 .contentImage svg').on('mouseleave',deerIn);
}

function deerOut(){
	for(var i = 0; i < allShapes.length; i++){
		$(allShapes[i]).css({
			'transform':'translate(' +shapesInfo[i].targetX+'px, '+shapesInfo[i].targetY+'px)',
			// 'transition':'all ' + randomTime + 's'
		});
	}

	$('svg #lines').css({
		opacity:0,
		transition:'opacity 1s',
	});
	
	changefillColor(0.7,1,allShapes,allPolyline);
	function changefillColor(orgOpacity,targetOpacity,target1,target2,target3){
		var colorR = 100+parseInt(Math.random()*155);
		var colorG = 200+parseInt(Math.random()*15);
		var colorB = 0+parseInt(Math.random()*10);

		if(target1 != null){
			changeIndividualColor(target1);
		}
		if(target2 != null){
			changeIndividualColor(target2);
		}
		if(target3 != null){
			changeIndividualColor(target3);
		}
		function changeIndividualColor(target){
			for(var i = 0; i < target.length; i++){
				var randomSpeed = Math.random()*2000;
				$(target[i]).css({
					fill:'rgba('+colorR+','+colorG+','+colorB+','+orgOpacity+')',
					opacity:targetOpacity,
					transition: "all "+randomSpeed/2000+'s'
				});
			}
		}
	}
}

function deerIn(){
	// console.log('deerOut');
	for(var i = 0; i < allShapes.length; i++){
		var randomTime = 0 + Math.random()*4;
		$(allShapes[i]).css({
			'transform':'translate(' +0+'px, '+0+'px)',
			'transition':'all ' + randomTime + 's'
		});
	}
	$('svg #lines').css({
		opacity:0.3
	});

	changefillBW(0.3,0.1,allShapes,allPolyline);
	function changefillBW(orgOpacity,targetOpacity,target1,target2,target3){

		if(target1 != null){
			changeIndividualColor(target1);
		}
		if(target2 != null){
			changeIndividualColor(target2);
		}
		if(target3 != null){
			changeIndividualColor(target3);
		}
		function changeIndividualColor(target){
			for(var i = 0; i < target.length; i++){
				var classOpacity = shapesInfo[i].shapeOpacity;
				$(target[i]).css({
					fill:'#000',
					opacity:classOpacity
				});
			}
		}
	}
}

