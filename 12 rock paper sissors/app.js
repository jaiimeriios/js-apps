// rock paper scissors

const game = () => {
	let pScore = 0;
	let cScore = 0;

	// statr game
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
		const computerHand = document.querySelector('.player-hand');
		const playerHand = document.querySelector('.computer-hand');
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
				return;
			} else {
				winner.textContent = 'Computer Wins';
				return;
			}
		}
		// check for paper
		if (playerChoise === 'paper') {
			if (computerChoise === 'scissors') {
				winner.textContent = 'Computer Wins!'
				return;
			} else {
				winner.textContent = 'Player Wins';
				return;
			}
		}
		// check for scissors
		if (playerChoise === 'paper') {
			if (computerChoise === 'rock') {
				winner.textContent = 'Computer Wins!'
				return;
			} else {
				winner.textContent = 'Player Wins';
				return;
			}
		}
	}


	// call inner functions
	startGame();
	playMatch();
}

game();