(function(window) {
	'use strict';

	var templates = {
		row: 	'<tr id="row-{{rowid}}" data-rowid="{{rowid}}" data-order="{{order}}">'
			+		'<td>{{order}}</td>'
			+		'<td>{{rowid}}</td>'
			+		'<td>{{name}}</td>'
			+		'<td>{{dob}}</td>'
			+		'<td>{{address}}</td>'
			+		'<td>'
			+			'<button class="btn-delete">delete</button>'
			+		'</td>'
			+	'</tr>',
		default: '<tr><td colspan="6">No template</td></tr>'
	};

	var t = {
		get: function(name) {
			return templates[name] || templates.default;
		}
	};

	window.app = window.app || {};
	window.app.template = t;
})(window);