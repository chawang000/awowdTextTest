$(document).ready(function(){
	if(!isMobile){
		deerFunctions();	
	}
	function deerFunctions(){
		var allCircles = $('svg #dots circle');
	var allPolygons = $('svg #lines polygon');
	var allShapes = $('svg #shapes polygon');
	var shapesInfo = [];
	var allPolyline = $('svg #shapes polyline');

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

	$('#homeSection_2').on('mouseenter',function(){
		for(var i = 0; i < allShapes.length; i++){
			var randomTime = 1 + Math.random()*2;
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
			// var colorA = $(target[i]).css('opacity');
			// console.log(target1);

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
						transition: "all "+randomSpeed/800+'s'
					});
					// $(target[i]).stop(true,true).animate({
					// 	opacity:targetOpacity,
					// },randomSpeed);
				}
			}
		}
	});


	$('#homeSection_2').on('mouseleave',function(){
		var randomTime = 1 + Math.random()*1;
		for(var i = 0; i < allShapes.length; i++){
			$(allShapes[i]).css({
				'transform':'translate(' +0+'px, '+0+'px)',
				'transition':'all ' + randomTime + 's'
			});
		}
		$('svg #lines').css({
			opacity:0.3,
			transition:'opacity 1s',
			webkitTransition: 'opacity 1s', 
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
					// console.log();
					var randomSpeed = Math.random()*2000;
					$(target[i]).css({
						fill:'#000',
						opacity:classOpacity,
						// transition: 'all '+randomSpeed/1000+'s'
					});
					// $(target[i]).stop(true,true).animate({
					// 	opacity:classOpacity,
					// },randomSpeed/2);
				}
			}
		}
	});
	}
	// console.log('ready');
	// <animateMotion path="M 0 0 H -5 Z" dur="3s" repeatCount="indefinite"></animateMotion>
	
});







