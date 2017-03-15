(function(window) {
	
	'use strict';

	var store = [];
	var rowid = 0;
	var template = null;

	function Home(container, data) {
		var that = this;

		$dom.elAsync({ template: 'home.html' })
			.then( t => template = t)
			.catch( error => console.log(error));

		setTimeout(function() {
			
			init(template, data, that);

			append(template, container);

		}, 250);
	}

	var init = function(template, data, context) {

		if (template) {

			var table = qs('#tbl', template);

			if (table) {

				store = data || [];

				rowid = (store && store.length) || 0;

				store.forEach(obj => {
					_fnInsertRow(obj);
				});

				qs('#btn-add', template)
					.addEventListener('click', context.addRow);

				qs('#btn-add-async', template)
					.addEventListener('click', context.addRowAsync);
			}
		}
	};

	Home.prototype.addRow = function(e) {

		rowid++;

		var obj = {
			rowid: rowid,
			order: qs('#order', template).value,
			name: qs('#name', template).value,
			dob: qs('#dob', template).value,
			address: qs('#address', template).value
		};

		store = store.sort((r1, r2) => Number(r1.order) > Number(r2.order));

		_fnInsertRow(obj);

		store.push(obj);
	};

	Home.prototype.addRowAsync = function(e) {

		rowid++;

		var obj = {
			rowid: rowid,
			order: qs('#order', template).value,
			name: qs('#name', template).value,
			dob: qs('#dob', template).value,
			address: qs('#address', template).value
		};

		store.sort((r1, r2) => Number(r1.order) > Number(r2.order));

		_fnInsertRowAsync(obj);

		store.push(obj);
	};

	var _fnInsertRow = function(obj) {

		var tableBody = qs('#tbody', template);

		var row = $dom.row({
			template: app.template.get('row'),
			data: obj,
			fn: {
				'.btn-delete': _fnRemoveRow
			}
		});

		var objOrder = obj.order;
		var beforeElement = null;

		for(var i = 0; i < store.length; i++) {

			if (Number(objOrder) < Number(store[i].order)) {
				beforeElement = qs('#row-' + store[i].rowid, tableBody);
				break;
			}
		}

		if (beforeElement) {
			tableBody.insertBefore(row, beforeElement);
		} else {
			append(row, tableBody);
		}
	};

	var _fnInsertRowAsync = function(obj) {

		var tableBody = qs('#tbody', template);
		var row = null;

		var row = $dom.rowAsync({
			template: 'row.html',
			data: obj,
			fn: {
				'.btn-delete': _fnRemoveRow
			}
		})
		.then(el => row = el);

		var objOrder = obj.order;
		var beforeElement = null;

		for(var i = 0; i < store.length; i++) {

			if (Number(objOrder) < Number(store[i].order)) {
				beforeElement = qs('#row-' + store[i].rowid, tableBody);
				break;
			}
		}

		setTimeout(function(){
			if (beforeElement) {
				tableBody.insertBefore(row, beforeElement);
			} else {
				append(row, tableBody);
			}
		}, 250);
	};

	var _fnRemoveRow = function(e) {

		var id = e.currentTarget.parentNode.parentNode.dataset.rowid;
		var el = e.currentTarget.parentNode.parentNode;

		var index = store.findIndex( obj => Number(obj.rowid) === Number(id));

		if (index >= 0) {
			store.splice(index, 1);
		}

		el.parentNode.removeChild(el);
	};

	window.app = window.app || {};
	window.app.vm = window.app.vm || {};
	window.app.vm.Home = Home;

})(window);