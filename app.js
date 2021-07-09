document.addEventListener('DOMContentLoaded', () => {

// create varibles
    const overlay = document.querySelector('#overlay');
    const qwerty = document.querySelector('#qwerty');
    const phrase = document.querySelector('#phrase');
    const ul = document.querySelector('#phraseUL');
    const buttonStart = document.querySelector('.btn__start');
    const buttonReset = document.querySelector('.btn__reset');
    const hearts = document.querySelector('#hearts');
    const title = document.querySelector('h2.title');
    let missedGuesses = 0;
    var phrases = [
        'Exceed Expectations', 
        'JadePuma', 
        'There is no I in HTML',
        'Let them eat CSS',
        'CSS',
        'HTML',
        'JavaScript',
        'TreeHouse'
    ];

// event listeners
    buttonStart.addEventListener('click', (e) => {
        overlay.style.display = 'none';
        buttonStart.style.display = 'none';
        buttonReset.style.display = 'flex';
    });

    buttonReset.addEventListener('click', (e) => {
        overlay.style.display = 'none';
        resetHearts();
        resetKeyboard();
        resetPhrase();
        console.log(missedGuesses);
    });

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

// functions
    function getRandomPhraseAsArray(array) {
        // get a phrase to use
        return array[Math.floor(Math.random() * array.length)];
    };

    function addPhraseToDisplay(text) {
        // show the phrase framework
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
        function gameOver(state) {
            overlay.style.display = 'flex';
            overlay.className = state;
        };
        if ( letters.length === showing.length ) {
            gameOver('win');
            title.innerHTML = 'You Win!!!';
        };
        if ( missedGuesses > 4 ) {
            gameOver('lose');
            title.innerHTML = 'Sorry, you lose';
        };
    };

    function resetPhrase() {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        };
        let randomPhrase = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(randomPhrase);
    };

    function resetKeyboard() {
        let chosen = document.querySelectorAll('.chosen');
        for ( i = 0; i < chosen.length; i +=1 ) {
            chosen[i].className = '';
        };
    };

    function resetHearts() {
        missedGuesses = 0;
        hearts.innerHTML = '<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li><li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li><li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li><li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li><li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>';
    };

// initial tasks
    let randomPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(randomPhrase);

});