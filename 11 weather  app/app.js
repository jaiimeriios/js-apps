// Weather App
// cihivisaz@daymail.life
// Qwer1234!

window.addEventListener('load', () => {
	let long;
	let lat;

	if (navigator.geolocation) {
		navigator.geolocation = getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const api = `https://api.darksky.net/forecast/3ed2820bdef835d0923968060af681dd/37.8267,-122.4233`;
		});
	}


})