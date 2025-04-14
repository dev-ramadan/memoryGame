let cardsContainer = document.querySelector(".game-board");
let winMessage = document.querySelector("#win-message");
let cardItems = [];
let isMatch = false;
let endGame = 0;
let levels = 1;
let currentCardCount = 0;
const emojis = [
    "🍉", "🍇", "🍋", "🍓", "🍍",
    "🥝", "🍌", "🍎", "🍒", "🥥",
    "🥭", "🍑", "🍈", "🍏", "🍊",
    "🫐", "🥕", "🌽", "🍅", "🥔"
];
let gameLevels = [
    { level: "1", cards: 8 },
    { level: "2", cards: 10 },
    { level: "3", cards: 14 },
    { level: "4", cards: 16 },
    { level: "5", cards: 18 },
    { level: "6", cards: 20 }
];

const getLevel = (level) => {
    let levelNumber = document.querySelector(".leve-number");
    const { cards } = gameLevels[level - 1];
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
        cardFront.textContent = '?';
        cardBack.textContent = card;
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
         setTimeout(()=>item.classList.remove("rotate"),1500)
    });
    cardItem.forEach(item => item.addEventListener("click", () => rotateCard(item)));
};

window.onload = () => getLevel(levels);

const rotateCard = (card) => {
    if (isMatch || cardItems.includes(card)) return;
    card.classList.add("rotate");
    cardItems.push(card);
    if (cardItems.length >= 2) {
        isMatch = true;
        checkMatch();
    }
};

const checkMatch = () => {
    let [card1, card2] = cardItems;
    const value1 = card1.querySelector(".card-back").textContent;
    const value2 = card2.querySelector(".card-back").textContent;
    if (value1 === value2) {
        cardItems = [];
        isMatch = false;
        endGame++;
        setTimeout(() => {
            if (endGame === currentCardCount / 2) {
                winMessage.classList.remove("hidden");
            }
        }, 300);
    } else {
        setTimeout(() => {
            card1.classList.remove("rotate");
            card2.classList.remove("rotate");
            cardItems = [];
            isMatch = false;
        }, 800);
    }
};

const nextLevel = () => {
    if (levels < gameLevels.length) {
        levels++;
        getLevel(levels);
        winMessage.classList.add("hidden");
    } else {
        const endGameMessage = document.querySelector("#end-message");
        endGameMessage.classList.remove("hidden");
    }
};

const restart = () => {
    location.reload();
};
