
/* Face Circle */
var headerWeight = 80;

window.onload = function() {circleSize();}
$(window).resize(function(){circleSize();});

function circleSize() {
	if(window.innerWidth > 1000) {
		$("#face").width($(window).width()*0.3);
		$("#face").height($(window).width()*0.3);
		headerWeight=80;
	}
	else {
		$("#mobileface").width($(window).width()*0.5);
		$("#mobileface").height($(window).width()*0.5);
		headerWeight=50;
	}
}

/* Scroll to section */
$(function() {
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top-headerWeight
				}, 1000);
				return false;
			}
		}
	});
});

/* Sticky Header */
$(window).scroll(function() {
	if ($(this).scrollTop() > 1) {  
		$('header').addClass("sticky");
	}
	else{
		$('header').removeClass("sticky");
	}
});
if(screen.width > 1000) {
	$(document).ready(function($){
		// browser window scroll (in pixels) after which the "back to top" link is shown
		var offset = 1000,
			//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
			offset_opacity = 1200,
			//duration of the top scrolling animation (in ms)
			scroll_top_duration = 700,
			//grab the "back to top" link
			$back_to_top = $('.cd-top');

		//hide or show the "back to top" link
		$(window).scroll(function(){
			( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
			
			/*
			if( $(this).scrollTop() > offset_opacity ) { 
				$back_to_top.addClass('cd-fade-out');
			}
			*/
		});

		//smooth scroll to top
		$back_to_top.on('click', function(event){
			event.preventDefault();
			$('body,html').animate({
				scrollTop: 0 ,
			 	}, scroll_top_duration
			);
		});
	});
}