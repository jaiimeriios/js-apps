// password generator app

(function () {

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




	console.log(configuracion.caracteres)



	// document.querySelector('');
	// document.querySelector('');
	// document.querySelector('');




}())