// Weather App
// https://darksky.net
// cihivisaz@daymail.life
// Qwer1234!

// window.addEventListener('load', () => {   })


(function () {

	let long;
	let lat;

	let locationTimezone = document.querySelector('.location-timezone');
	let	temperatureDegree = document.querySelector('.temperature-degree');
	let	temperatureDescription = document.querySelector('.temperature-description');

	if (navigator.geolocation) {

		navigator.geolocation.getCurrentPosition(position => {

			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/'
			const api = `${proxy}https://api.darksky.net/forecast/3ed2820bdef835d0923968060af681dd/${lat},${long}`;

			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data)
					const {temperature, summary, icon} = data.currently;
					
					// set DOM elements from API
					locationTimezone.textContent = data.timezone;
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					
					// set icons
					setIcons(icon, document.querySelector('.icon'));
				})
		});

	}

	function setIcons(icon, iconID){
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon])
	}

})();
