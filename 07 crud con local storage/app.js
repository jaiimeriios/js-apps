// CRUD con Local Storage


// variables globales
const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.querySelector('#listaActividades');
let arrayActividades = [];


// funciones
const CrearTask = (actividad) => {
	let item = {
		actividad: actividad,
		estado: false
	}
	arrayActividades.push(item);
	return item;
}

const GuardarDB = () => {
	localStorage.setItem('task', JSON.stringify(arrayActividades))
	PintarDB()
}

const PintarDB = () => {
	listaActividadesUI.innerHTML = '';
	arrayActividades = JSON.parse(localStorage.getItem('task'))

	if (arrayActividades === null) {
		arrayActividades = [];
	} else {
		arrayActividades.forEach(element => {
			listaActividadesUI.innerHTML +=
			`
			<div class="alert alert-warning" role="alert">
				<i class="material-icons float-left">
					keyboard_arrow_right
				</i>
				<span class="font-weight-bold">${element.actividad}</span> - ${element.estado}
				<span class="float-right">
					<i class="material-icons">
						done
					</i>
					<i class="material-icons">
						delete_forever
					</i>
				</span>
			</div>
			`
		})
	}
}


// eventListeners

formularioUI.addEventListener('submit', (e) => {

	e.preventDefault();
	let actividadUI = document.querySelector('#actividad').value;
	CrearTask(actividadUI);

	GuardarDB();

	formularioUI.reset();
})

document.addEventListener('DOMContentLoaded', PintarDB)

