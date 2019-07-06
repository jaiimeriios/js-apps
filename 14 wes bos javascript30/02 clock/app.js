const hourHand = document.querySelector('.hour-hand')
const minuteHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');

function setDate() {
	const now = new Date();

	const hour = now.getHours();
	const hourDegrees = ((hour / 12) * 360) + 90;
	hourHand.style.transform = `rotate(${hourDegrees}deg)`

	const minutes = now.getMinutes();
	const minutesDegrees = ((minutes / 60) * 360) + 90;
	minuteHand.style.transform = `rotate(${minutesDegrees}deg)`

	const seconds = now.getSeconds();
	const secondsDegrees = ((seconds / 60) * 360) + 90;
	secondHand.style.transform = `rotate(${secondsDegrees}deg)`

	console.log(hour, minutes, seconds)
}
setInterval(setDate, 1000);

setDate();