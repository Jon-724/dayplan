let numberToGuess = Math.round(Math.random() * 100);
let tries = 0;

function guessTheNumber() {
    tries = tries + 1;
    displayTries.innerHTML = 'Versuche: ' + tries;

    if(numberToGuess == myNumber.value) {
        headline.innerHTML = 'ok ja das ist meine Zahl';

    }

    if(numberToGuess > myNumber.value) {
        headline.innerHTML = 'Die Zahl ist größer';
    }

    if(numberToGuess < myNumber.value) {
        headline.innerHTML = 'Die Zahl ist kleiner';
    }
    myNumber.value = '';
}
