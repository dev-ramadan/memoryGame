let cardsContainer = document.querySelector(".game-board");
let winMessage = document.querySelector("#win-message");
let loseMessage = document.querySelector("#lose-message");
let times = document.querySelector("#time");
let nameContainer = document.querySelector("#start-screen");
let inputName = document.querySelector(".input_name");
let sound = document.querySelector("#sound");
let cardItems = [];
let isMatch = false;
let endGame = 0;
let levels = 1;
let currentCardCount = 0;
let cartBackChack = [];
let inatialTime = 0;
let timerInterval;
const win = 'sound/win.wav';
const endLevel = 'sound/endLevel.wav';
const worng = 'sound/worng.wav';
const worngLevel = 'sound/worngGame.mp3';
const sucsess = 'sound/sucsess.wav';
const emojis = [
    "image/2.jpeg", "image/1.jpeg", "image/4.jpeg", "image/3.jpeg", "image/5.jpeg",
    "image/6.jpeg", "image/9.jpeg", "image/12.jpeg", "image/15.jpeg", "image/18.jpeg",
    "image/7.jpeg", "image/10.jpeg", "image/13.jpeg", "image/16.jpeg", "image/19.jpeg",
    "image/8.jpeg", "image/11.jpeg", "image/14.jpeg", "image/17.jpeg", "image/20.jpeg",

];
let gameLevels = [
    { level: "1", cards: 8, showTime: 600, time: 31 },
    { level: "2", cards: 12, showTime: 500, time: 51 },
    { level: "3", cards: 14, showTime: 400, time: 81 },
    { level: "4", cards: 16, showTime: 300, time: 131 },
    { level: "5", cards: 18, showTime: 200, time: 151 },
    { level: "6", cards: 20, showTime: 100, time: 181 }
];
const getLevel = (level) => {
    let levelNumber = document.querySelector(".leve-number");
    const { cards } = gameLevels[level - 1];
    const { showTime } = gameLevels[level - 1]
    currentCardCount = cards;
    const selectLevel = emojis.slice(0, cards / 2);
    const fullCards = [...selectLevel, ...selectLevel].sort(() => Math.random() - .5);
    cardsContainer.innerHTML = ' ';
    fullCards.forEach(card => {
        const cardItem = document.createElement('div');
        cardItem.classList.add("card");
        const cardInner = document.createElement('div');
        cardInner.classList.add("card-inner");
        const cardFront = document.createElement('div');
        cardFront.classList.add("card-front");
        const cardBack = document.createElement('div');
        cardBack.classList.add("card-back");
        cardFront.innerHTML = "<img src='back.jpeg' class='image-back'>";
        cardBack.innerHTML = `<img src="${card}" class="card-image">`;
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardItem.appendChild(cardInner);
        cardsContainer.appendChild(cardItem);
        levelNumber.textContent = level;
    });
    cardItems = [];
    isMatch = false;
    endGame = 0;
    const cardItem = document.querySelectorAll(".card-inner");
    cardItem.forEach(item => {
        item.classList.add("rotate");
        setTimeout(() => item.classList.remove("rotate"), showTime)
    });
    cardItem.forEach(item => item.addEventListener("click", () => rotateCard(item)));
};
const nextLevel = () => {
    if (levels < gameLevels.length) {
        levels++;
        getLevel(levels);
        winMessage.classList.add("hidden");
        loseMessage.classList.add("hidden")
        startTime()
    }
};
const startTime = () => {
    clearInterval(timerInterval)
    inatialTime = 0
    timerInterval = setInterval(() => {
        times.textContent = inatialTime
        inatialTime++
        const { time } = gameLevels[levels - 1]
        if (inatialTime === time) {
            sound.src = worng ;
            sound.play()
            loseMessage.classList.remove("hidden");
            clearInterval(timerInterval);
            removeRotate()
        }
    }, 1000);
}

const startGame = () => {
    const nameInput = document.querySelector(".input_name");
    const name = nameInput.value.trim();
    if (name === "") {
        alert("من فضلك أدخل اسمك");
        return;
    }
    document.querySelector(".player-lose").textContent = name;
    document.querySelector(".player-name").textContent = name;
    const startScreen = document.querySelector("#start-screen");
    startScreen.classList.add("hide-screen");
    setTimeout(() => {
        startScreen.style.display = "none";
        getLevel(levels);
        startTime()
    }, 500);
}
window.onload = () => {
    nameContainer.classList.remove("hidden")
};
const rotateCard = (card) => {
    if (isMatch || cardItems.includes(card)) return;
    card.classList.add("rotate");
    cardItems.push(card);
    if (cardItems.length >= 2) {
        isMatch = true;
        checkMatch();
    }
};
const removeRotate = () => {
    const cardItem = document.querySelectorAll(".card-inner");
    cardItem.forEach(item => {
        item.classList.remove("rotate");
        isMatch = true
    });
}
const checkMatch = () => {
    let [card1, card2] = cardItems;
    const value1 = card1.querySelector(".card-back img").src;
    const value2 = card2.querySelector(".card-back img").src;
    if (value1 === value2) {
        sound.src = sucsess
        sound.play()
        cardItems = [];
        isMatch = false;
        endGame++;
        setTimeout(() => {
            if (levels === gameLevels.length && endGame === currentCardCount / 2) {
                const endGameMessage = document.querySelector("#end-message");
                winMessage.classList.add("hidden");
                endGameMessage.classList.remove("hidden");
                sound.src = win;
                sound.play()
            }
            else if (endGame === currentCardCount / 2) {
                winMessage.classList.remove("hidden");
                sound.src = endLevel;
                sound.play()
            }
        }, 300);
    } else {
        sound.src = worngLevel;
        sound.play()
        setTimeout(() => {
            card1.classList.remove("rotate");
            card2.classList.remove("rotate");
            cardItems = [];
            isMatch = false;
        }, 800);
    }
};
const restart = () => {
    location.reload();
};
