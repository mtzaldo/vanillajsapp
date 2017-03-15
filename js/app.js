'use strict';

var singleObj = {
	rowid: 0,
	order: 0,
	name: 'jane doe',
	dob: '1/1/1900',
	address: '123 main st.'
};

var objs = [
	Object.assign({}, singleObj, { rowid: 4, order: 7 }),
	Object.assign({}, singleObj, { rowid: 3, order: 5 }),
	Object.assign({}, singleObj, { rowid: 2, order: 3 }),
	Object.assign({}, singleObj, { rowid: 1, order: 1 }),
].sort((r1, r2) => Number(r1.order) > Number(r2.order));

var container = document.getElementById('container');

new app.vm.Home(container, objs);