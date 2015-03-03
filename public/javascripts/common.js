var $ = function (el) {
	if (typeof el == 'string') {
		return document.querySelectorAll(el);
	}
	return [el];
};
Element.prototype.on = Element.prototype.addEventListener;

var Ajax = {
	get: function(url, options) {
		options = options || {};
		
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.setRequestHeader('Authorization', 'Bearer ' + gapi.auth.getToken().access_token);
			xhr.onload = function(e) {
				if (this.status == 200) {
					var json = JSON.parse(this.response);
					resolve(json);
				}
				else {
					reject(Error('GET request failed: ' + url));
				}
			};
			xhr.onerror = function() {
				reject(Error("Network Error"));
			};
			xhr.send();
		});
	}
};