
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