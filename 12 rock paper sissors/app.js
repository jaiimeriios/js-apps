// rock paper scissors

const game = () => {
	let pScore = 0;
	let cScore = 0;

	// statr game
	const startGame = () => {
		const introScreen = document.querySelector('.intro');
		const playBtn = document.querySelector('.intro button');
		const match = document.querySelector('.match');

		playBtn.addEventListener('click', () =>{
			introScreen.classList.add('fadeOut');
			match.classList.add('fadeIn');
		})
	}

	// play match
	const playMatch = () =>{
		const computerHand =  document.querySelector('.player-hand');
		const playerHand =  document.querySelector('.computer-hand');
		const options = document.querySelectorAll('.options button');

		// computer random number
		const computerOptions = ['rock', 'paper', 'scissors'];

		options.forEach((option) =>{
			option.addEventListener('click', function(){
				const computerNumber = Math.floor(Math.random() * 3);
				const computerChoise = computerOptions[computerNumber];
				console.log(computerChoise);
			})
		})


	}


	// call inner functions
	startGame();
	playMatch();
}

game();