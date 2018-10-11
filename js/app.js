
// Create a list that holds all of your cards
const cards = [...document.getElementsByClassName('card')];
 
shuffle(cards);
console.log(cards);

cards.forEach(card => {
	document.querySelector('.deck').appendChild(card);
});

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


let openCards = [];
 
cards.forEach(card => {
 	card.addEventListener('click', () => {
 		// showCard(card);
 		trackOpenCards(card);
 		addMove();	
 	});
});

function toggleCard(card) {
	card.classList.toggle('open');
 	card.classList.toggle('show');
 	console.log("card");
}

function trackOpenCards(card) {
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
		lockOpen();
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

// save moves counter html to variable
const counter = document.querySelector('.moves');
// start moves at 0
let moves = 0;

// functionality to increment moves counter by 1 
function addMove() {
	moves ++;
	counter.innerHTML = moves;
}


















