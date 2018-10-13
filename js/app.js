// Create an array list that holds all of your cards
const cards = [...document.getElementsByClassName('card')];
// save moves counter html to variable
const counter = document.querySelector('.moves');
// save timer html to variable
const time = document.querySelector('.timer');
// save stars html to variable
const stars = document.querySelector('.stars');

// declare global variables
let timerOn;
let totalTime;
let moves;
let finalMove;
let matchedCards;
let starsNum;
let openCards;

// run the function to set game with initial values
startGame();

// set the initial values to start game
function startGame() {
	// initial values
	timerOn = false;
	totalTime = 0;
	moves = 0;
	finalMove = 0;
	matchedCards = 0;
	starsNum = 3;
	counter.innerHTML = 0;
	time.innerHTML = `0:00`;
	openCards = [];
	// shuffle deck
	shuffle(cards);
	// loop through shuffled deck array and display them on page
	cards.forEach(card => {
		document.querySelector('.deck').appendChild(card);
	});
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


// ---------- CARD CLICK FUNCTIONALITY -----------

// set functionality for when user clicks cards
cards.forEach(card => {
 	// add event listener to every card
 	card.addEventListener('click', () => {
 		// run function to track the open cards
 		trackOpenCards(card);
 		// check if game is not over and there have been no moves made
 		if (matchedCards !== 8 && moves !== 0) {
 			if (!timerOn) {
 				runTimer();
 				timerOn = true;
 			}
 		}
 		// check if all cards are matched meaning game is over  
		if (matchedCards === 8 && finalMove !== 1) {
			// add the final move to stop activity in score panel
			finalMove ++
			// trigger modal
			modal();
		}
		// check that the pause button is reset
 		restorePause(); 
 	});
});

// declare timer variable globally to make interval function accessible in global scope
let timer;
// start running time
function runTimer() {
		// set interval function to run every second
		timer = window.setInterval(displayTime, 1000);
}

// stop timer from running time
function stopTimer() {
	clearInterval(timer);
}

// check openCards array 
function trackOpenCards(card) {
	// check that card is not already opened or matched 
	if (!openCards.includes(card) && !card.classList.contains('match')) {
			// run function to add valid move
			addMove();
		};
	// check that only two unmatched, distinct cards can be opened at a time;
	// check that it is not already a matched card to push into openCards array
	if (openCards.length < 2 && !openCards.includes(card) && !card.classList.contains('match')) {
		// run function to open card
		toggleCard(card);
		// push card into array for comparison
		openCards.push(card);
		// run function to compare
		checkOpen();
	}	
}

// open hidden card
function toggleCard(card) {
	card.classList.toggle('open');
 	card.classList.toggle('show');
}

// if there are two cards in openCards array, run compareCards function
function checkOpen() {
		if (openCards.length === 2) {
			compareCards();
		};
}

// compare the two cards in the openCards array
function compareCards() {
	// check if open cards match
	if (openCards[0].querySelector('i').className === openCards[1].querySelector('i').className) {
		// add a count per matched pair
		matchedCards ++;
		// run function to lock open matched card
		lockOpen();
	// if cards do not match, hide again after half a second 
	} else {
		setTimeout(() => {
			// run function to hide
			hideAndRemove();
		}, 500);
	}
} 

// keep matched cards open
function lockOpen() {
	// loop through matched cards in openCards array
	openCards.forEach(card => {
		// set style to .match
		card.classList.toggle('match');
	})
	// empty openCards array to continue game
	openCards = [];
}

// hide cards that do not match
function hideAndRemove() {
	// loop through cards in openCards array 
	openCards.forEach(card => {
			// toggle unmatched cards back to hidden
			toggleCard(card);
		})
		// empty openCards array to continue game
		openCards = [];
}


// ------ SCORE PANEL BUTTONS AND DISPLAY FUNCTIONALITY ------
// in order of display appearance:

// track how many moves have been made to reduce stars after a certain number of moves
function checkMoves() {
	if (moves === 32 || moves === 40) {
		// deduct star
		removeStar();
	}
}

// function called to remove star
function removeStar() {
	// remove first star when 32 moves have been made
	if (!stars.lastElementChild.firstElementChild.classList.contains('remove-star')) {
		stars.lastElementChild.firstElementChild.classList.toggle('remove-star');
		starsNum --;
	// remove second star when 40 moves have been made
	} else if (stars.lastElementChild.firstElementChild.classList.contains('remove-star')){
		stars.firstElementChild.nextElementSibling.firstElementChild.classList.toggle('remove-star');
		starsNum --;
	}
}

// function to replace stars when game is resarted
function replaceStar() {
	// replace last star if it was removed
	if (stars.lastElementChild.firstElementChild.classList.contains('remove-star')) {
		stars.lastElementChild.firstElementChild.classList.toggle('remove-star');
	}; 
	// replace second star if it was removed
	if (stars.firstElementChild.nextElementSibling.firstElementChild.classList.contains('remove-star')){
		stars.firstElementChild.nextElementSibling.firstElementChild.classList.toggle('remove-star');
	};
}

// functionality to increment moves counter by 1 
function addMove() {
	moves ++;
	// reflect moves in score panel
	counter.innerHTML = moves;
	// track moves for star rating
	checkMoves();
}

// save restart button to variable
let restartButton = document.querySelector('.fa-repeat');
// add click event listener to restart button
restartButton.addEventListener('click', () => {
	// run restart function to reset game
	restartGame();	
})

// reset game and cards that are open
function restartGame() {
	// run function to stop current game and reset initial values 
	stopTimer();
	startGame();
	replaceStar();
	restorePause();
	// toggle any open cards back to hidden
	for(card of cards)
		if (card.classList.contains('match')) {
			card.classList.toggle('match');
			card.classList.toggle('open');
			card.classList.toggle('show');
		} else if (card.classList.contains('open')) {
			card.classList.toggle('open');
			card.classList.toggle('show');
		};
}

// save pause button to variable
const pauseButton = document.querySelector('.pause');
// add click event listener to pause button
pauseButton.addEventListener('click', () => {
	// check if game is not already over/won 
	if (matchedCards !== 8 && moves !== 0) {
		// run function to implement pause functionality
		checkPauseStatus();			
	}
})

// function to toggle pause button functionality
function checkPauseStatus() {
	// if pause is clicked
	if (pauseButton.classList.contains('fa-pause')) {
		// stop running time
		stopTimer();
		timerOn = false;
		// change pause to play button
		pauseButton.classList.toggle('fa-pause');
		pauseButton.classList.toggle('fa-play');
	} 
	// if play is clicked
	else {
		// continue running time
		runTimer();
		timerOn = true;
		// change play back to pause button
		restorePause();
	} 
}

// restore pause button
function restorePause() {
	if (pauseButton.classList.contains('fa-play')) {
		pauseButton.classList.toggle('fa-pause');
		pauseButton.classList.toggle('fa-play');
	}
}

// declare time measurements within global scope
let minutes;
let seconds;

// code functionality to capture and display time passing 
function displayTime() {
	// increment time by seconds
	totalTime ++;
	// round down to capture whole number time measurements
	minutes = Math.floor(totalTime/60);
	seconds = Math.floor(totalTime - (minutes * 60));
		// add a 0 before single number integers
		if (seconds < 10) {
			seconds = '0' + Math.floor(totalTime - (minutes * 60));
		}
	// reflect passing time in score panel
	time.innerHTML = `${minutes}:${seconds}`;
}


// ------ MODAL FUNCTIONALITY ------

// call the modal to become visible
function modal() {
	// stop timer since game is over
	stopTimer();
	// toggle modal on
	$('#you-win').modal('toggle');
	// add current game stats to modal message
	document.querySelector('.modal-body').innerHTML = `<em>YOUR STATS<em><br><br> Moves: ${moves} <br>
	Time: ${minutes}:${seconds} <br> Stars: ${starsNum}`
}

// save Play Again button to variable
let playAgain = document.querySelector('.play-again');
// add event listener to restart game when button is clicked
playAgain.addEventListener('click', () => {
	restartGame();	
})








