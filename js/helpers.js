(function(window, document, undefined) {
	'use strict';

	window.qs = function (selector, scope) {
		return (scope || document).querySelector(selector);
	};

	window.qsa = function(selector, scope) {
		return (scope || document).querySelectorAll(selector);
	};

	window.append = function(el, scope) {

		(scope || document).appendChild(el);
	}

})(window, document, undefined);


//DOM Helpers
(function(window, document, undefined) {
	'use strict';

	window.$dom = window.$dom || {};

	window.$dom.ce = function (tag, { id, className, text } = {}) {		
		
		var el = document.createElement(tag);

		if (id) el.id = id;
		if (className) el.className = className;
		if (text) el.innerText = text;

		return el;

	};

	window.$dom.row = function ({ template, data, fn } = {}) {
		
		var html = template;

		if (data)
			html = template.replace(/\{{([^}]*)}}/g, (r, k) => data[k]);

		var tableContainer = $dom.ce('table');
		tableContainer.innerHTML = html;

		if (fn) {
			Object.keys(fn).forEach(function(key) {

				qsa(key, tableContainer)
					.forEach(function(el) {
						el.addEventListener('click', fn[key]);
					});
			});
		}

		return tableContainer.firstChild.firstChild;
	};

	window.$dom.rowAsync = function({ template, data, fn } = {}) {

		var url = 'partials/' + template;

		var p = fetch(url)
			.then(response => response.text())
			.then(text => {
				
				return $dom.row({
					template: text,
					data: data,
					fn : fn
				});

			})
			.catch(error => {
				console.log('no template');

				return $dom.ce("tr", { text: "no template" });
			});

		return p;
	};

	window.$dom.el = function ({ template, data, fn } = {}) {
		
		var html = template;

		if (data)
			html = template.replace(/\{{([^}]*)}}/g, (r, k) => data[k]);

		var divContainer = $dom.ce('div');
		divContainer.innerHTML = html;

		if (fn) {
			Object.keys(fn).forEach(function(key) {

				qsa(key, divContainer)
					.forEach(function(el) {
						el.addEventListener('click', fn[key]);
					});
			});
		}

		return divContainer.firstChild;
	};

	window.$dom.elAsync = function({ template, data, fn } = {}) {

		var url = 'partials/' + template;

		var p = fetch(url)
			.then(response => response.text())
			.then(text => {
				var el = $dom.el({
					template: text,
					data: data,
					fn : fn
				});
				return el;

			})
			.catch(error => {
				console.log('no template');

				return $dom.ce("div", { text: "no template" });
			});

		return p;
	};

})(window, document, undefined);