	
function heandler(){

	const btn 		 = document.querySelector('#btn');
	const pattern	 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;	
	const list 		 = document.getElementById('user-list');
	const info		 = [];
	const str 		 = localStorage.getItem('persone');
	const todo 		 = JSON.parse(str);

	console.log('str', str);
	console.log('todo', todo);

	/*todo.forEach(function(item, i){
		console.log('itempp',item.personeName);


		 Person(item.personeName, item.personeAddress,item.personeRoles);
	})
*/
	function Person(name, address, role) {
		this.name 	 = name;
		this.address = address;
		this.role 	 = role;
		this.createList(name, address, role);
		
		localStorage.setItem('persone', JSON.stringify(info));		
	}

	Person.prototype.createList = function(name, address, role) {
		let item 		= document.createElement('li');
		let spanName 	= document.createElement('span');
		let spanAddress = document.createElement('span');
		let spanRole 	= document.createElement('span');
		let	error   	= document.querySelector('.error');
		let elements 	= document.querySelectorAll('.span');

		if( name === '' || address === '' || !address.match(pattern) ) {
			error.style.display = "block";
		} else {
			spanName.innerHTML 	  = name;	
			spanAddress.innerHTML = address;
			spanRole.innerHTML 	  = role;
			spanName.setAttribute('contenteditable', false);
			spanAddress.setAttribute('contenteditable', false);
			spanRole.setAttribute('contenteditable', false);
			spanName.className = 'span';
			spanAddress.className = 'span';
			spanRole.className = 'span';
			item.style.listStyleType ="none";
			item.appendChild(spanName);
			item.appendChild(spanAddress);
			item.appendChild(spanRole);
			list.appendChild(item);
			error.style.display = "none";

			let getRole = new Object();
			getRole.personeName = name;
			getRole.personeAddress = address;
			getRole.personeRoles = role;

			info.push(getRole);				
		}

		return list;
	}

	function Admin(name, address, role){
		Person.apply(this, arguments);
	}

	Admin.prototype = Object.create(Person.prototype);
	Admin.prototype.constructor = Admin;
	
	function User(name, address, role){
		Person.apply(this, arguments);

	}

	User.prototype = Object.create(Person.prototype);
	User.prototype.constructor = User;

	function Guest(name, address, role){
		Person.apply(this, arguments);
	}

	Guest.prototype = Object.create(Person.prototype);
	Guest.prototype.constructor = Guest;

	btn.addEventListener('click', function(e) {
		let name 	  = document.getElementById('name').value.trim();
		let address   = document.getElementById('address').value.trim();
		let role 	  = document.getElementById('users');
		let roleValue = role.options[role.selectedIndex].value;

		new Person(name, address, roleValue);

	});

	list.addEventListener('dblclick', function(e) {
		if (e.target.tagName.toLowerCase() == 'span') {
			e.target.setAttribute('contenteditable', true);
		}
	})
	
}
	document.addEventListener("DOMContentLoaded",heandler);