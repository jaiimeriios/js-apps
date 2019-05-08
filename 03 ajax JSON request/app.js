console.log(':D');

const boton = document.querySelector('#boton')
boton.addEventListener('click', traerDatos)

function traerDatos(){

	const xhttp = new XMLHttpRequest
	xhttp.open('GET', 'catalogo.json', true)
	xhttp.send()
	xhttp.onreadystatechange = function(){

		if( this.readyState == 4 && this.status == 200 ){

			// responseText returns the text received from a server following a request being sent
			let datos = JSON.parse(this.responseText)

			let respuesta = document.querySelector('#respuesta')
			respuesta.innerHTML = ''
			
			for(let item of datos){
				
				let listItem = `
					<tr>
						<td>${item.title}</td>
						<td>${item.artist}</td>
					</tr>
				`
				respuesta.insertAdjacentHTML("beforebegin", listItem)
			}
		}
	}
}