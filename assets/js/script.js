const words = [
	'cover',
	'secretive',
	'prefer',	
	'dramatic',
	'stove',
	'thick',
	'guitar',
	'permissible',
	'cooling',
	'word',
	'ocean',
	'authority',
	'volcano',
	'drab',
	'friend',
	'bury',
	'tan',
	'pies',
	'warm',
	'demonic',
	'yak',
	'spiders',
	'grandiose',
	'soak',
	'paste',
	'crayon',
	'rock',
	'fact',
	'low',
	'acoustics',
	'dizzy',
	'eatable'
];

function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

const alphabet = genCharArray('a', 'z');
const dash = '_';
const maxMistakes = 6;

function startGame() {
	let word = words[Math.floor(Math.random() * words.length)];
	let mistakes = 0;
	let guess = [];

	for (let i = 0; i < word.length; i++) {
		guess[i] = '_';
	}

	initGameboard(guess, mistakes);

	$('.button-letter').click(function() {
		let letter = $(this).text();
		$('.guess').empty();
		$(this).detach();

		if (isMistake(letter, word)) {
			mistakes++;
			setMistakes(mistakes);
		}
		checkGuess(letter, guess, word);
		drawGuess(guess);

		if (isPlayerLost(mistakes)) {
			$('.guess-letter').addClass('red');
			setTimeout(function() {
				modalMsg(false, word);
			}, 50);
		}

		if (isPlayerWon(guess, word)) {
			$('.guess-letter').addClass('green');
			setTimeout(function() {
				modalMsg(true, word);
			}, 50);
		}
	});
}

function modalMsg(isWin, word) {
	let message = '';

	if (isWin) {
		message = `Yeah! It's "${word}"! You Win! Want You play again?`;
	} else {
		message = `You lose! The word was "${word}". Play again?`;
	}

	if (confirm(message)) {
		clearBoard();
		startGame();
	}
}

function drawButtons() {
	for (let i = 0; i < alphabet.length; i++) {
		$('.buttons').append(`<div class="letter button-letter">${alphabet[i]}</div>`);
	}
}

function drawGuess(guess) {
	for (let i = 0; i < guess.length; i++) {
		$('.guess').append(`<div class="letter guess-letter">${guess[i]}</div>`);	
	}
}

function setMistakes(mistakes) {
	$('.mistakes-number').text(mistakes);
}

function initGameboard(guess, mistakes) {
	drawGuess(guess);
	drawButtons();
	setMistakes(mistakes);
}

function checkGuess(letter, guess, word) {
	for (let i = 0; i < word.length; i++) {
		if (letter == word[i]) {
			guess[i] = letter;
		}
	}
}

function isMistake(letter, word) {
	if (word.includes(letter)) {
		return false;
	}
	return true;
}

function isPlayerLost(mistakes) {
	if (mistakes == maxMistakes) {
		return true;
	}
	return false;
}

function isPlayerWon(guess, word) {
	if (word == guess.join('')) {
		return true;
	}
	return false;
}

function clearBoard() {
	$('.guess').empty();
	$('.buttons').empty();
}

startGame();
