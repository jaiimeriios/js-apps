// Task App con Local Storage

let formTask = document.querySelector('#formTask');
let title = document.querySelector('#title');
let description = document.querySelector('#description');

formTask.addEventListener('submit', saveTask);

function saveTask(e) {
	e.preventDefault();
	
	const task = {
		title,
		description
	}

	localStorage.setItem('task', JSON.stringify(task));
	JSON.parse(localStorage.getItem('task'));
	console.log(localStorage.getItem('task'))


	// console.log(e);
}