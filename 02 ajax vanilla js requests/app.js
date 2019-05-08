// :D

let boton = document.querySelector('#boton')

boton.addEventListener('click', traerDatos)

function traerDatos(){

	const xhttp = new XMLHttpRequest()

	xhttp.open('GET', 'ajax1.txt', true)

	xhttp.send()

	xhttp.onreadystatechange = function() {

		if( this.readyState == 4 && this.status == 200 ){
			
			console.log(this.responseText)

			document.querySelector('#respuesta').innerHTML = this.responseText
		}
	}

}