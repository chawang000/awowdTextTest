
function deerFunctions(){
	var svg = document.getElementById('deerSVG');
	var trigger = svg;
	// console.log(trigger)
	svg.addEventListener("load",function(){
		var svgDOC = svg.contentDocument;//will not work in chrome or locally
		//Note that a limitation of this technique is that it is restricted by the same-origin policy, so deer.svg must be hosted on the same domain as the .html file, otherwise the inner DOM of the object will be inaccessible.
		var allShapes = svgDOC.getElementById('shapes').getElementsByTagName('polygon');
		var lines = svgDOC.getElementById('lines')
		var allPolyline = svgDOC.getElementById('shapes').getElementsByTagName('polyline');
		// console.log(svgDOC.getElementById('shapes'));
		var shapesInfo = [];

		
		for(var i = 0; i < allShapes.length; i++){
			var op = window.getComputedStyle(allShapes[i], null).getPropertyValue("opacity");;
			var shapeTargetX = (Math.random()-0.2)*30;
			var shapeTargetY = (Math.random()-0.7)*50;
			shapesInfo.push({
				shapePosition:allShapes[i].getAttribute('points').split(' '),
				shapeOpacity:op,
				targetX:shapeTargetX,
				targetY:shapeTargetY
			});
		}
		// console.log(shapesInfo[0].shapeOpacity);

		

		trigger.addEventListener('mouseenter',function(){
			// console.log('entering');
			if(isMobile) return;
			for(var i = 0; i < allShapes.length; i++){
				var randomTime = 1 + Math.random()*2;
				allShapes[i].style.transitionDuration = randomTime+'s';
				allShapes[i].style.transform = 'translate(' +shapesInfo[i].targetX+'px, '+shapesInfo[i].targetY+'px)'
			}

			lines.style.opacity = 0;
			lines.style.transitionDuration = '1s';

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
						target[i].style.fill = 'rgba('+colorR+','+colorG+','+colorB+','+orgOpacity+')';
						target[i].style.opacity = targetOpacity;
						target[i].style.transitionDuration = randomSpeed/800+'s';
					}
				}
			}
		});



		trigger.addEventListener('mouseleave',function(){
			if(isMobile) return;
			var randomTime = 1 + Math.random()*1;
			for(var i = 0; i < allShapes.length; i++){
				var randomTime = 1 + Math.random()*2;
				allShapes[i].style.transitionDuration = randomTime+'s';
				allShapes[i].style.transform = 'translate(' +0+'px, '+0+'px)'
				
				// $(allShapes[i]).css({
				// 	'transform':'translate(' +0+'px, '+0+'px)',
				// 	'transition':'all ' + randomTime + 's'
				// });
			}

			lines.style.opacity = 0.3;
			lines.style.transitionDuration = '1s';
			// $('svg #lines').css({
			// 	opacity:0.3,
			// 	transition:'opacity 1s'
			// });

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
						// target[i].style.transitionDuration = randomTime+'s';
						target[i].style.fill = '#000';
						target[i].style.opacity = classOpacity;
						// $(target[i]).css({
						// 	fill:'#000',
						// 	opacity:classOpacity,
						// 	// transition: 'all '+randomSpeed/1000+'s'
						// });
					}
				}
			}
		});
	});
}






