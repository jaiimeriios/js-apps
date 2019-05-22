// CRUD con Local Storage


// variables globales
const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.querySelector('#listaActividades');
let arrayActividades = [];


// funcciones
const CrearTask = (actividad) => {

	let item = {
		actividad: actividad,
		estado: false
	}
	arrayActividades.push(item);
	return item;
}

let task = CrearTask('adf');
let otraTask = CrearTask('qwerqwer')
console.log(task, otraTask)


// eventListeners