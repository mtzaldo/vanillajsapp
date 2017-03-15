(function(window) {
	'use strict';

	var templates = {
		home: 	'<div id="table-form">'
			+		'<input type="number" name="order" id="order" placeholder="order">'
			+		'<br>'
			+		'<input type="number" name="id" id="id" placeholder="id">'
			+		'<br>'
			+		'<input type="text" name="name" id="name" placeholder="name">'
			+		'<br>'
			+		'<input type="text" name="dob" id="dob" placeholder="dob">'
			+		'<br>'
			+		'<input type="text" name="address" id="address" placeholder="address">'
			+		'<br>'
			+		'<button id="btn-add">Add</button>'
			+		'<button id="btn-add-async">Add Async</button>'
			+		'<!-- Table -->'
			+		'<table id="tbl">'
			+			'<thead>'
			+				'<th width="50px">^</th>'
			+				'<th width="50px">#</th>'
			+				'<th width="100px">name</th>'
			+				'<th width="100px">dob</th>'
			+				'<th width="200px">address</th>'
			+				'<th width="100px"></th>'
			+			'</thead>'
			+			'<tbody id="tbody"></tbody>'
			+			'</table>'
			+	'</div>',

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