// password generator app

(function () {

	// variables and objects -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

	var app = document.querySelector('#app');
	var inputCaracteres = document.querySelector('#numero-caracteres');
	var configuracion = {
		caracteres: parseInt(inputCaracteres.value),
		simbolos: true,
		numeros: true,
		mayusculas: true,
		minusculas: true
	}
	var caracteres = {
		numeros: '0 1 2 3 4 5 6 7 8 9',
		simbolos: '~ ! @ # $ % ^ & * ( ) _ + - = [ { } ] ; : , < . ? /',
		mayusculas: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
		minusculas: 'a b c d e f g h i j k l m n o p q r s t u v w x y z',
	}

	// events =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

	app.addEventListener('submit', function (e) {
		e.preventDefault();
	})

	app.elements.namedItem('btn-mas-uno').addEventListener('click', function () {
		configuracion.caracteres++;
		inputCaracteres.value = configuracion.caracteres;
	})

	app.elements.namedItem('btn-menos-uno').addEventListener('click', function () {
		if (configuracion.caracteres > 1) {
			configuracion.caracteres--;
			inputCaracteres.value = configuracion.caracteres;
		}
	})


	// button events -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

	app.elements.namedItem('btn-simbolos').addEventListener('click', function () {
		btnToggle(this);
		configuracion.simbolos = !configuracion.simbolos;
		console.log('simbolos ' + configuracion.simbolos)
	})

	app.elements.namedItem('btn-numeros').addEventListener('click', function () {
		btnToggle(this);
		configuracion.numeros = !configuracion.numeros;
		console.log('numeros ' + configuracion.numeros)
	})

	app.elements.namedItem('btn-mayuscula').addEventListener('click', function () {
		btnToggle(this);
		configuracion.mayusculas = !configuracion.mayusculas;
		console.log('mayusculas ' + configuracion.mayusculas)
	})

	// toggle buttons function
	let btnToggle = (elemento) => {
		elemento.classList.toggle('false');
		elemento.childNodes[0].nextElementSibling.classList.toggle('none')
	}


	// generate generatePassword -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

	app.elements.namedItem('btn-generar').addEventListener('click', function () {
		generatePassword()
	})

	let generatePassword = () => {
		let caracteresFinales = '';
		let password = '';

		for (propiedad in configuracion) {

			if (configuracion[propiedad] == true) {
				caracteresFinales += caracteres[propiedad]+ ' ';
				console.log(caracteresFinales)
			}
		}
	}

}())