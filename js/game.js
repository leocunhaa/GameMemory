const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'Brito',
    'Contrato',
    'FelipeLula2',
    'lendaria',
    'LeoBrasil2',
    'LeoQuartel2',
    'Lucas',
    'Marcos',
    'RenanManco2',
    'calvao'
];

const createElement = (tag, className)=>{
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = ()=>{
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length == 20){
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML} segundos`);
    }
}

const checkCards = () =>{

    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter == secondCharacter){

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else{

        setTimeout(()=>{
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);
    }

}

const revealCard = ({ target })=>{
    if(target.parentNode.className.includes('revel-card')){
        return;
    }

    if(firstCard == ''){

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if(secondCard == ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

const createCard = (character) =>{

    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url('../image/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card;
}


const loadGame = ()=>{

    const duplicateArray = [ ...characters, ...characters ];

    const shuffledArray = duplicateArray.sort( ()=> Math.random() - 0.5);

    shuffledArray.forEach((characters)=>{

        const card = createCard(characters);
        grid.appendChild(card);

    });
}

const startTimer = ()=>{

    this.loop = setInterval(()=>{

        const currentTime = Number(timer.innerHTML);
        timer.innerHTML = currentTime + 1;

    }, 1000);


}

window.onload = ()=>{

    spanPlayer.innerHTML = localStorage.getItem('player');

    startTimer();
    loadGame();
}


