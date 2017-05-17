$(document).ready(function(){
	// console.log('ready');
	// <animateMotion path="M 0 0 H -5 Z" dur="3s" repeatCount="indefinite"></animateMotion>
	var allCircles = $('svg #dots circle');
	var allPolygons = $('svg #lines polygon');
	var allShapes = $('svg #shapes polygon');
	var shapesInfo = [];
	var allPolyline = $('svg #shapes polyline');


	
	// for(var i = 0; i < allCircles.length; i++){
	// 	var circleR = parseFloat(allCircles[i].getAttribute('r'));
	// 	// console.log(circleR);
	// 	if(circleR < 0.8){

	// 		$(allCircles[i]).remove();
	// 	}else if(circleR < 0.1){
	// 		// $(allCircles[i]).remove();
	// 		// $(allCircles[i]).addClass('cls-white');
	// 		var randomX = (Math.random()-0.8)*85;
	// 		var randomY = (Math.random()-0.7)*50;
	// 		var randomTime = 15+ Math.random()*5;
	// 		allCircles[i].innerHTML = '<animateMotion path="M 0 0 L '+randomX+','+randomY+' Z" dur="'+randomTime+'" keySplines="0.9 1.9 0.8 0.8" repeatCount="indefinite"></animateMotion>';
	// 	}
	// }

	for(var i = 0; i < allShapes.length; i++){
		var opacity = $('.'+allShapes[i].className.baseVal).css('opacity');
		var shapeTargetX = (Math.random()-0.2)*30;
		var shapeTargetY = (Math.random()-0.7)*50;
		shapesInfo.push({
			// shapeObj:allShapes[i],
			shapePosition:allShapes[i].getAttribute('points').split(' '),
			shapeOpacity:opacity,
			targetX:shapeTargetX,
			targetY:shapeTargetY
		});
		// var randomSpeed = Math.random()*2000;
	}

	$('#homeSection_2').on('mouseenter',function(){
		for(var i = 0; i < allShapes.length; i++){
			var randomTime = 0 + Math.random()*1;
			allShapes[i].innerHTML = '<animateTransform attributeName="transform" attributeType="XML" type="translate" dur="'+randomTime+'s" fill="freeze" to="'+shapesInfo[i].targetX+' '+shapesInfo[i].targetY+'" />'
		

		}

		$('svg #lines').css({
			opacity:0,
			transition:'opacity 1s'
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
						transition: "all "+randomSpeed/1000+'s'
					});
					$(target[i]).stop(true,true).animate({
						opacity:targetOpacity,
					},randomSpeed);
				}
			}
		}
	});


	$('#homeSection_2').on('mouseleave',function(){

		for(var i = 0; i < allShapes.length; i++){
			allShapes[i].innerHTML = '<animateTransform attributeName="transform" attributeType="XML" type="translate" to="0 0" />'
		
		}
		$('svg #lines').css({
			opacity:0.3,
			transition:'opacity 1s'
		});

		changefillBW(0.3,0.1,allShapes,allPolyline);
		function changefillBW(orgOpacity,targetOpacity,target1,target2,target3){

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
					// console.log(shapesInfo[i].shapeOpacity);
					// console.log(target[i].className.baseVal);
					var classFill = $('.'+target[i].className.baseVal).css('fill');
					var classOpacity = shapesInfo[i].shapeOpacity;
					// console.log();
					var randomSpeed = Math.random()*2000;
					$(target[i]).css({
						fill:'#000',
						// transition: "all 0s"
					});
					$(target[i]).stop(true,true).animate({
						opacity:classOpacity,
					},randomSpeed/2);
				}
			}
		}

	});
});







