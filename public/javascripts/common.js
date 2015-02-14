var $ = document.querySelectorAll.bind(document);
Element.prototype.on = Element.prototype.addEventListener;

var Ajax = {
	get: function(url, options) {
		options = options || {};
		
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.setRequestHeader('Authorization', 'Bearer ' + gapi.auth.getToken().access_token);
		xhr.onload = function(e) {
			if (this.status == 200) {
// 				debugger;
				if (options.success) { options.success(this.response); }
			}
			else {
// 				debugger;
				if (options.failure) { options.failure(); }
			}
		}
		xhr.send();
	}
}