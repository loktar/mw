(function() {
	
	var $ = document.querySelectorAll.bind(document);
	Element.prototype.on = Element.prototype.addEventListener;


	function showGoogleSignIn() {
		$('#sign-in .popover')[0].classList.add('shown');
	}

	function hideGoogleSignIn() {
		$('#sign-in .popover')[0].classList.remove('shown');
	}

	$('#sign-in button')[0].on('click', showGoogleSignIn);
	$('#sign-in .popover header button')[0].on('click', hideGoogleSignIn);

})();