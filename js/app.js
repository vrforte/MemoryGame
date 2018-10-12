
// Create a list that holds all of your cards
const cards = [...document.getElementsByClassName('card')];

let openCards = [];

// save moves counter html to variable
const counter = document.querySelector('.moves');
let moves = 0;
let finalMove = 0;
let matchedCards = 0;
let timerOn;
let totalTime = 0;
let time = document.querySelector('.timer');
let starsNum;
let stars = document.querySelector('.stars');

startGame();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


/*
 * set up the event listener for a card. If a card is clicked:

 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function startGame() {
	timerOn = false;
	totalTime = 0;
	moves = 0;
	finalMove = 0;
	matchedCards = 0;
	starsNum = 3;
	counter.innerHTML = 0;
	time.innerHTML = `0:00`
	shuffle(cards);
	console.log(cards);

	cards.forEach(card => {
		document.querySelector('.deck').appendChild(card);
	});
	openCards = [];
}

let restartButton = document.querySelector('.fa-repeat');

restartButton.addEventListener('click', () => {
	console.log('click');
	restartGame();
	
})


let pauseButton = document.querySelector('.fa-pause');

pauseButton.addEventListener('click', () => {
	console.log('click');
	if (matchedCards !== 8) {
		checkPauseStatus();			
	}
})

const iconCurrent = document.querySelector('.pause');

function checkPauseStatus() {
	if (iconCurrent.classList.contains('fa-pause')) {
		stopTimer();
		timerOn = false;
		iconCurrent.classList.toggle('fa-pause');
		iconCurrent.classList.toggle('fa-play');
	} 
	else if (iconCurrent.classList.contains('fa-play')) {
		runTimer();
		timerOn = true;
		iconCurrent.classList.toggle('fa-pause');
		iconCurrent.classList.toggle('fa-play');
	} 
}

function restartGame() {
	stopTimer();
	startGame();
	replaceStar();
	restorePause();
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

// function restart() {
// 	startGame();
// 	clearInterval(runTimer);
// 	stopTimer();
// 	totalTime = 0;
// 	// timerOn = false;
// }

function stopTimer() {
	clearInterval(timer);
}
 
cards.forEach(card => {
 	card.addEventListener('click', () => {
 		// showCard(card);
 		trackOpenCards(card);
 		if (matchedCards !== 8 && moves !== 0) {
 			if (!timerOn) {
 				runTimer();
 				timerOn = true;
 			}
 		}
	 	
 		// checks that the pause button is off
 		restorePause();
 		
		if (matchedCards === 8 && finalMove !== 1) {
			finalMove ++
			modal();

		} 
 	});
});

function restorePause() {
	if (iconCurrent.classList.contains('fa-play')) {
		iconCurrent.classList.toggle('fa-pause');
		iconCurrent.classList.toggle('fa-play');
	}
}

function modal() {
	stopTimer();
	$('#you-win').modal('toggle');
	document.querySelector('.modal-body').innerHTML = `<em>YOUR STATS<em><br><br> Moves: ${moves} <br>
	Time: ${minutes}:${seconds} <br> Stars: ${starsNum}`
}

function toggleCard(card) {
	card.classList.toggle('open');
 	card.classList.toggle('show');
 	console.log("card");
}

function trackOpenCards(card) {
	if (!openCards.includes(card) && !card.classList.contains('match')) {
			addMove();
		};
	if (openCards.length < 2 && !openCards.includes(card) && !card.classList.contains('match')) {
		toggleCard(card);
		openCards.push(card);
		checkOpen();
	}	
}

function checkOpen() {
		if (openCards.length === 2) {
			compareCards();
		};
	}


function compareCards() {
	if (openCards[0].querySelector('i').className === openCards[1].querySelector('i').className) {
		console.log('match')
		matchedCards ++;
		lockOpen();
		console.log(matchedCards);
		
	} else {
		setTimeout(() => {
			hideAndRemove();
		}, 500);
		console.log('nope')
	// 	removeAndHide();
	}
	// console.log(openCards[0].querySelector('i').className);
	// console.log(openCards[1].querySelector('i').className);
} 

function lockOpen() {
	openCards.forEach(card => {
		card.classList.toggle('match');
	})
	openCards = [];
}

function hideAndRemove() {
	openCards.forEach(card => {
			toggleCard(card);
		})
		openCards = [];
}


// start moves at 0

// functionality to increment moves counter by 1 
function addMove() {
	moves ++;
	counter.innerHTML = moves;
	checkMoves();
}

let timer;

function runTimer() {
		timer = window.setInterval(displayTime, 1000);
}

let minutes;
let seconds;

function displayTime() {
	totalTime ++;
	minutes = Math.floor(totalTime/60);
	seconds = Math.floor(totalTime - (minutes * 60));
		if (seconds < 10) {
			seconds = '0' + Math.floor(totalTime - (minutes * 60));
		}
	// console.log(totalTime);
	time.innerHTML = `${minutes}:${seconds}`;
}

function checkMoves() {
	if (moves === 32 || moves === 40) {
		removeStar();

	}
}

function removeStar() {
	if (!stars.lastElementChild.firstElementChild.classList.contains('remove-star')) {
		stars.lastElementChild.firstElementChild.classList.toggle('remove-star');
		starsNum --;
	} else if (stars.lastElementChild.firstElementChild.classList.contains('remove-star')){
		stars.firstElementChild.nextElementSibling.firstElementChild.classList.toggle('remove-star');
		starsNum --;
	}
}

function replaceStar() {
	if (stars.lastElementChild.firstElementChild.classList.contains('remove-star')) {
		stars.lastElementChild.firstElementChild.classList.toggle('remove-star');
	}; 
	if (stars.firstElementChild.nextElementSibling.firstElementChild.classList.contains('remove-star')){
		stars.firstElementChild.nextElementSibling.firstElementChild.classList.toggle('remove-star');
	};
}



let playAgain = document.querySelector('.play-again');

playAgain.addEventListener('click', () => {
	console.log('click');
	restartGame();	
})








