# Memory Game Project

### Description

This JavaScript code-based card matching game is designed by Udacity. The task of coding its functionality was assigned to me as a student project required for the Front-End Nanodgree course section "JavaScript & the DOM".  

### Functionality

To begin this project, Udacity provided me with the html, css styling, background image, and javaScript shuffle function. My goals to achieve included:

* Use javaScript to manipulate the DOM by storing html elments in variables in order access and alter them. 
* Construct functions and write code that enable the following game play operations:
	* cards appear face down with images hidden
	* game only allows two cards to be opened at a time
	* game compares opened cards: 
		* if opened cards match, they remain open and change color
		* if they do not match, they are quickly hidden once again 
	* game keeps track of and displays passing time
	* game keeps track of and displays amount of player's valid moves
	* game reduces stars after player reaches a certain amount of valid moves
	* game includes a restart button that resets game with a newly shuffled deck of cards 
* Implement a pop up modal when player wins, notifying the player of his/her game stats. Modal includes a Play Again button to start a new game.

There are comments throughout the code detailing its purpose.

### Instuctions

To run the app:
1. Download classic archade game repository from GitHub to your desktop or prefered location on your computer
2. Open folder and navigate to the index.html file
3. Right click (or two-finger click for mac) on index.html to open in your prefered browser
4. Game is running in the browser window and ready to play!

### How to Play

To play the game:
1. Click any card to start the game and the timer. The card's hidden image is revealed.
2. Click any other card to reveal its image. If the two opened cards match they will change color and remain open. If not, the images will quickly be hidden from you again. Try to remember the images for future moves.
3. Your objective is to match all the card images using the shortest amount of moves possible. There are 16 total cards with 8 pairs of matching images.
4. Your moves will be counted from the first card click. Moves are only counted if they are valid, meaning they are on a card with a hidden image. Clicks on cards that are already open do not increment your move count. If you make too many moves you will begin to lose stars. 
5. If you wish, the game can be paused by clicking the pause button. When the pause button is clicked, the pause button turns into a play button and the timer is stopped. To continue playing, simply click the play button, or any of the cards, and the timer will start running again. 
6. When all the card pairs have been matched a modal will pop up on the screen with your score stats and giving you the option to play again. Click the Play Again button to dismiss the modal and start a new game. If you click the Close button, 'X' at the top right corner of the modal, or the screen behind the modal, the modal will be dismissed and you will still see the game you just played with all the open matched cards and your stat numbers in the score panel. If you wish to start a new game, click on the restart button. 

### Credit

For education and guidance received to understand and complete this project,
Thanks to:

* [Ucacity](https://www.udacity.com)
* [stackoverflow.com](https://stackoverflow.com)
* [developer.mozilla.org](https://developer.mozilla.org/en-US/)
* Matthew Cranford blog - [Memory Game Walkthrough](https://matthewcranford.com/memory-game-walkthrough-part-1-setup/)
* [codecraft.tv](https://codecraft.tv/courses/angular/es6-typescript/arrow/)
* [hackernoon.com](https://hackernoon.com/htmlcollection-nodelist-and-array-of-objects-da42737181f9)
* [Bootstrap](https://getbootstrap.com/docs/4.1/components/modal/)
* [Font Awesome](https://fontawesome.com/icons/)

### License

-Any license and/or rights are held by Udacity







