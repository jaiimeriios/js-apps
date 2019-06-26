// rock paper scissors

const game = () => {
	let pScore = 0;
	let cScore = 0;

	// start game
	const startGame = () => {
		const introScreen = document.querySelector('.intro');
		const playBtn = document.querySelector('.intro button');
		const match = document.querySelector('.match');

		playBtn.addEventListener('click', () => {
			introScreen.classList.add('fadeOut');
			match.classList.add('fadeIn');
		})
	}

	// play match
	const playMatch = () => {
		const computerHand = document.querySelector('.computer-hand');
		const playerHand = document.querySelector('.player-hand');
		const options = document.querySelectorAll('.options button');

		// computer random number
		const computerOptions = ['rock', 'paper', 'scissors'];

		options.forEach((option) => {
			option.addEventListener('click', function () {
				// computer random choise
				const computerNumber = Math.floor(Math.random() * 3);
				const computerChoise = computerOptions[computerNumber];
				
				//compare hands
				compareHands(this.textContent, computerChoise);

				// update images
				playerHand.src = `./imgs/${this.textContent}.png`
				computerHand.src = `./imgs/${computerChoise}.png`
			})
		})
	}

	const compareHands = (playerChoise, computerChoise) => {
		const winner = document.querySelector('.winner');

		// tie
		if (playerChoise === computerChoise) {
			winner.textContent = "It is a tie";
			return;
		}
		// check for rock
		if (playerChoise === 'rock') {
			if (computerChoise === 'scissors') {
				winner.textContent = 'Player Wins!'
				pScore++;
				updateScore();
				return;
			} else {
				winner.textContent = 'Computer Wins';
				cScore++;
				updateScore();
				return;
			}
		}
		// check for paper
		if (playerChoise === 'paper') {
			if (computerChoise === 'rock') {
				winner.textContent = 'Player Wins!'
				pScore++;
				updateScore();
				return;
			} else {
				winner.textContent = 'Computer Wins';
				cScore++;
				updateScore();
				return;
			}
		}
		// check for scissors
		if (playerChoise === 'scissors') {
			if (computerChoise === 'paper') {
				winner.textContent = 'Player Wins!'
				pScore++;
				updateScore();
				return;
			} else {
				winner.textContent = 'Computer Wins';
				cScore++;
				updateScore();
				return;
			}
		}
	}

	const updateScore = () => {
		const playerScore = document.querySelector('.player-score p');
		const computerScore = document.querySelector('.computer-score p');
		playerScore.textContent = pScore;
		computerScore.textContent = cScore;
	}


	// call inner functions
	startGame();
	playMatch();
}

game();