// Card data.
const cardsArray = [
    {
        name: 'chelsea',
        img: 'img/chelsea.png',
    },
    {
        name: 'mancity',
        img: 'img/mancity.png',
    },
    {
        name: 'psg',
        img: 'img/psg.png',
    },
    {
        name: 'inter',
        img: 'img/inter.png',
    },
    {
        name: 'real',
        img: 'img/real.png',
    },
    {
        name: 'barca',
        img: 'img/barca.png',
    },
    {
        name: 'bayern',
        img: 'img/bayern.png',
    },
    {
        name: 'dortmund',
        img: 'img/dortmund.png',
    },
    {
        name: 'porto',
        img: 'img/porto.png',
    },
    {
        name: 'marseille',
        img: 'img/marseille.png',
    },
    {
        name: 'olympiacos',
        img: 'img/olympiacos.png',
    },
    {
        name: 'zenit',
        img: 'img/zenit.png',
    },
];

/*-----------------------------------------------------------------------------------------------------------*/
//Time.
const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
let totalSeconds = 0;
let timerInterval;
function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    const valString = val + '';
    if (valString.length < 2) {
        return '0' + valString;
    } else {
        return valString;
    }
}

function startTimer() {
    timerInterval = setInterval(setTime, 1000);
}
function stopTimer() {
    clearInterval(timerInterval);
}
/*-----------------------------------------------------------------------------------------------------------*/

// Randomize game grid on each load.
const gameGrid = cardsArray.concat(cardsArray).sort(function () {
    return 0.5 - Math.random();
});

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;
let start = 0;
const startBtn = document.querySelector('.start');
const replayBtn = document.querySelector('.replay');
let countMatch = 0;
const win = document.querySelector('.win');
const minutesWin = document.getElementById('minutes-win');
const secondsWin = document.getElementById('seconds-win');
const time = document.getElementById('time');
let movesCount = 0;
const moves = document.getElementById('moves');
const movesValue = document.getElementById('moves-value');
const movesWin = document.getElementById('moves-value-win');


// Grab the div with an id of root.
const game = document.getElementById('game');

// Create a section with a class of grid.
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');

// Append the grid section to the game div.
game.appendChild(grid);

// For each item in the gameGrid array.
gameGrid.forEach((item) => {
    const name = item.name,
        img = item.img;

    // Create card element with the name dataset.
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;

    // Create front of card.
    const front = document.createElement('div');
    front.classList.add('front');

    // Create back of card, which contains.
    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = 'url(' + img + ')';

    // Append card to grid, and front and back to each card.
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
})

// Add match CSS.
const match = () => {
    const selected = document.querySelectorAll('.selected')
    selected.forEach((card) => {
        card.classList.add('match');
    })

    countMatch = document.getElementsByClassName('match').length;
    console.log(countMatch);
    if (countMatch === 24) {
        stopTimer();
        setTimeout(() => {
            time.style.visibility = 'hidden';
            moves.style.visibility = 'hidden';
            win.style.display = 'block';
            secondsWin.innerHTML = secondsLabel.textContent;
            minutesWin.innerHTML = minutesLabel.textContent;
            movesWin.innerHTML = movesCount.toString();
        }, delay);
    }
}

const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    const selected = document.querySelectorAll('.selected')
    selected.forEach((card) => {
        card.classList.remove('selected');
    })
}

// Add event listener to grid.
grid.addEventListener('click', function (event) {
    if (start === 1) {
        // The event target is our clicked item
        let clicked = event.target;

        // Do not allow the grid section itself to be selected; only select divs inside the grid.
        if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
            return;
        }

        if (count < 2) {
            count++;
            if (count === 1) {
                // Assign first guess.
                firstGuess = clicked.parentNode.dataset.name;
                console.log(firstGuess);
                clicked.parentNode.classList.add('selected');
            } else {
                // Assign second guess.
                secondGuess = clicked.parentNode.dataset.name;
                console.log(secondGuess);
                clicked.parentNode.classList.add('selected');
            }
            // If both guesses are not empty.
            if (firstGuess && secondGuess) {
                // and the first guess matches the second match.
                if (firstGuess === secondGuess) {
                    setTimeout(match, delay);
                }
                setTimeout(resetGuesses, delay);
                movesCount ++;
                movesValue.innerHTML = movesCount.toString();
            }
            // Set previous target to clicked.
            previousTarget = clicked;
        }
    } else {
        startBtn.style.animation = 'start-animation 1s';
        setTimeout(() => {
            startBtn.style.animation = '';
        }, 1000);
    }
})


startBtn.addEventListener('click', function () {
    startBtn.style.visibility = 'hidden';
    start = 1;
    startTimer();
});

replayBtn.addEventListener('click', function () {
    location.reload();
});
