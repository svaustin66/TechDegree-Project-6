document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('#overlay');
    const qwerty = document.querySelector('#qwerty');
    const phrase = document.querySelector('#phrase');
    const ul = document.querySelector('#phraseUL');
    const buttonReset = document.querySelector('.btn__reset');
    const hearts = document.querySelector('#hearts');
    const title = document.querySelector('h2.title');
    let missedGuesses = 0;
    var phrases = [
        'A test run in time saves nine', 
        'The early bird catches the code bugs', 
        'There is no I in HTML',
        'I regret that have but one life to give to JavaScript',
        'Ask not what JavaScript will do for you but what you will do for JavaScript',
        'Let them eat CSS',
        'CSS',
        'HTML',
        'JavaScript',
        'TreeHouse'
    ];

    buttonReset.addEventListener('click', (e) => {
        overlay.style.display = 'none';
    });

    function getRandomPhraseAsArray(array) {
        // get a phrase to use
        return array[Math.floor(Math.random() * array.length)];
    };

    function addPhraseToDisplay(text) {
        // show the random phrase
        for (let i = 0; i < text.length; i += 1) {
            let li = document.createElement('li');
            let character = text[i];
            li.textContent = character;
            li.setAttribute('id', 'character');
            if ( character === ' ' ) {
                li.className = 'space';
            } else {
                li.className = 'letter';
            };
            ul.appendChild(li);
        }
    };

    let randomPhrase = getRandomPhraseAsArray(phrases);

    addPhraseToDisplay(randomPhrase);

    function checkLetter(button) {
        let lis = document.querySelectorAll('#character');
        let match = null;
        for (let i=0; i < lis.length; i += 1) {
            if ( button === lis[i].textContent.toLowerCase() ) {
                lis[i].classList.add('show');
                match = button;
            };
        };
        return match;
    };

    function checkWin() {
        let letters = document.querySelectorAll('.letter');
        let showing = document.querySelectorAll('.show');
        if ( letters.length === showing.length ) {
            console.log('win');
            overlay.className = 'win';
            overlay.style.display = 'flex';
            title.innerHTML = 'You Win!!!';
        };
        if ( missedGuesses > 4 ) {
            console.log('lose');
            overlay.className = 'lose';
            overlay.style.display = 'flex';
            title.innerHTML = 'Sorry, you lose';
        };
    };
    
    qwerty.addEventListener('click', (e) => {
        if ( e.target.tagName === 'BUTTON') {
            if ( e.target.className === 'chosen') {
            } else {
                let letter = e.target.innerHTML;
                e.target.className = 'chosen';
                let match = checkLetter(letter);
                if ( match != letter ) {
                    hearts.removeChild(hearts.lastElementChild);
                    missedGuesses += 1;
                };
            };
        };
        checkWin();
    });    
    


});