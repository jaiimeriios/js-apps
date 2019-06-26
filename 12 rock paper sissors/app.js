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
		
	}


	// call inner functions
	startGame();
}

game();