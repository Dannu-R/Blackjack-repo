const startBtn = document.querySelector('.start-btn');
const intro = document.querySelector('.intro')
const game = document.querySelector('.game');
// const playerCardDiv = document.createElement('div');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

startBtn.addEventListener('click', function() {
  intro.style.opacity = '0';
  intro.addEventListener('transitionend', function() {
    intro.style.display = 'none';
    game.classList.add('active');
  })
  const drawBtn = document.querySelector('.draw');
  const stayBtn = document.querySelector('.stay');
  const playerCards = document.querySelector('.player');
  const scoreCard = document.querySelector('.score');
  // playerCards.append(playerCardDiv);

  const turn = document.querySelector('.turn');
  turn.textContent = "Player's turn"
  let playerTurn = true;
  let playerScore = 0;
  let dealerScore = 0;
  dealerCards = document.querySelector('.dealer');
  let dealerCard = null;
  const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  const suits = ['club', 'heart', 'spade', 'diamond'];
  let aceDict = {};
  cards = [];
  cardValues.forEach(value => {
    for(i=0; i<4; i++) {
      cards.push(`${value}-${suits[i]}`);
    };
  });
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffleArray(cards);
  
  function pullCard(score) {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    const cardArray = (cards.pop()).split('-');
    const valueOne = document.createElement('h1');
    const valueTwo = document.createElement('h1');
    const suit = document.createElement('h1')


    if (['A', 'J', 'Q', 'K'].includes(cardArray[0])) {
      valueOne.textContent = cardArray[0];
      if (valueOne.textContent != 'A') {
        score += 10;
      } else {
        card.classList.add('class', 'ace');
        aceDict['A'] = 11;
        score += 11;
      }
    } else {
      valueOne.textContent = parseInt(cardArray[0]);
      score += parseInt(valueOne.textContent);
    }

    Object.keys(aceDict).forEach(key => {
      if (score > 21) {
        if (aceDict[key] == 11) {
          aceDict[key] = 1;
          score -= 10;
        }
      }
    })

    

    valueTwo.textContent = valueOne.textContent;
    suit.textContent = cardArray[1];
    
    valueOne.setAttribute('class', 'symbol-one');
    suit.setAttribute('class', 'symbol-two');
    valueTwo.setAttribute('class', 'symbol-three');

    if (['heart', 'diamond'].includes(cardArray[1])) {
      valueOne.classList.add('red');
      suit.classList.add('red');
      valueTwo.classList.add('red');
    } else {
      valueOne.classList.add('black');
      suit.classList.add('black');
      valueTwo.classList.add('black');
    }

    if (suit.textContent == 'club') {
      suit.innerHTML = `<svg id='Clubs_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' opacity='0'/>


<g transform="matrix(1 0 0 1 12 12)" >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill-rule: nonzero; opacity: 1;" transform=" translate(-12, -12)" d="M 18 9 C 16.859375 9 15.027344 10.335938 13.523438 11.628906 C 14.65625 9.765625 16 7.28125 16 6 C 16 3.789063 14.210938 2 12 2 C 9.789063 2 8 3.789063 8 6 C 8 7.28125 9.34375 9.765625 10.476563 11.628906 C 8.972656 10.335938 7.140625 9 6 9 C 3.789063 9 2 10.789063 2 13 C 2 15.210938 3.789063 17 6 17 C 7.164063 17 9.039063 16.167969 10.558594 15.382813 C 11.390625 15.09375 11 16 11 16 L 8.722656 20.554688 C 8.390625 21.21875 8.875 22 9.617188 22 L 14.382813 22 C 15.125 22 15.609375 21.21875 15.277344 20.554688 L 13 16 C 13 16 12.671875 15.078125 13.441406 15.382813 C 14.960938 16.167969 16.835938 17 18 17 C 20.210938 17 22 15.210938 22 13 C 22 10.789063 20.210938 9 18 9 Z" stroke-linecap="round" />
</g>
</svg>`;
    } else if (suit.textContent == 'diamond') {
      suit.innerHTML = `<svg id='Diamonds_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' opacity='0'/>


<g transform="matrix(0.77 0 0 0.77 12 12)" >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill-rule: nonzero; opacity: 1;" transform=" translate(-15, -15)" d="M 15 2 C 14.310001161788986 2.000958924946729 13.669228078908018 2.3575182550303593 13.304688 2.9433594000000003 L 4.5058594 13.673828 C 4.18077375366558 14.039172309105505 4.000812089148705 14.51096372101892 4 15 C 4.0005581860825155 15.485325782866182 4.177571695439157 15.953890797891697 4.498046900000001 16.318359 L 13.298828 27.050781 C 13.663051939224781 27.640635703507108 14.306755733709963 27.99980918631627 14.999999999999998 28 C 15.689998759230695 27.99904116110807 16.330771824762632 27.642481991865395 16.695312 27.056641 L 25.494141 16.326172 C 25.81922650128566 15.960827632152526 25.999188021063937 15.489036226627666 26 15 C 25.998863022727832 14.52683697184436 25.830006379038014 14.069400943143261 25.523438 13.708984 L 25.501953 13.681641 L 16.701172 2.9492188 C 16.336948012300432 2.359364173091405 15.69324422659531 2.000190770859018 14.999999999999998 1.9999999999999998 z" stroke-linecap="round" />
</g>
</svg>`;
    } else if (suit.textContent == 'heart'){
      suit.innerHTML = `<svg id='Heart_Outline_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' opacity='0'/>


<g transform="matrix(0.91 0 0 0.91 12 12)" >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill-rule: nonzero; opacity: 1;" transform=" translate(-13, -13.5)" d="M 17.867188 3.890625 C 15.773438 3.890625 13.980469 5.382813 12.996094 6.410156 C 12.015625 5.382813 10.226563 3.890625 8.132813 3.890625 C 4.519531 3.890625 2 6.40625 2 10.007813 C 2 13.980469 5.132813 16.546875 8.160156 19.027344 C 9.589844 20.199219 11.070313 21.410156 12.203125 22.757813 C 12.394531 22.980469 12.675781 23.109375 12.96875 23.109375 L 13.027344 23.109375 C 13.324219 23.109375 13.601563 22.980469 13.792969 22.757813 C 14.929688 21.410156 16.40625 20.199219 17.839844 19.027344 C 20.867188 16.546875 24 13.980469 24 10.007813 C 24 6.40625 21.480469 3.890625 17.867188 3.890625 Z" stroke-linecap="round" />
</g>
</svg>`;
    } else {
      suit.innerHTML = `<svg id='Spades_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' opacity='0'/>


<g transform="matrix(0.48 0 0 0.48 12 12)" >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill-rule: nonzero; opacity: 1;" transform=" translate(-24, -24)" d="M 26.662 3.917 C 25.081 2.6899999999999995 22.884999999999998 2.7079999999999997 21.305 3.937 C 14.792 9.004 -0.843 22.638 5.474 32.428 C 6.424 33.9 7.828 35.029999999999994 9.398 35.785999999999994 C 13.623999999999999 37.821 17.792 37.135999999999996 20.762 34.91499999999999 L 17.368000000000002 40.85499999999999 C 16.313 42.702 17.647 45 19.774 45 L 28.227 45 C 30.354 45 31.688 42.702 30.632 40.855000000000004 L 27.235000000000003 34.911 C 29.945000000000004 36.936 33.645 37.689 37.483000000000004 36.26 C 39.078 35.666 40.532000000000004 34.69 41.656000000000006 33.403 C 50.127 23.7 33.426 9.167 26.662 3.917 z" stroke-linecap="round" />
</g>
</svg>`;
    }

    card.append(valueOne);
    card.append(suit);
    card.append(valueTwo);
    // card.innerHTML = `<img 
    //       src="./Screenshot_2024-07-12_at_5.07.25_PM-removebg-preview.png" 
    //       alt="back of card"
    //       class="back"
    //     >`
    return [card, score];
  }

  function notify(outcome) {
    const notification = document.createElement('div');
    const notificationTitle = document.createElement('h1');
    
    const notificationText = document.createElement('p');
    const notificationBtn = document.createElement('button');
  
    notification.setAttribute('class', 'notification');
  
    if (outcome == 'win') {
      notificationTitle.classList.add('notification-title-win');
      notificationTitle.textContent = 'CONGRATS!';
      notificationText.classList.add('notification-text-win');
      notificationText.textContent = 'Nice! You won!';
      notificationBtn.classList.add('notification-btn-win');
      notificationBtn.textContent = 'But can you do it again?';
    } else {
      notificationTitle.classList.add('notification-title-lose');
      notificationTitle.textContent = 'UH OH!';
      notificationText.classList.add('notification-text-lose');
      notificationText.innerHTML = "oh no! you lost! <br> Don't worry, you can always";
      notificationBtn.classList.add('notification-btn-lose');
      notificationBtn.textContent = 'Try again!';
    }
  
    notification.append(notificationTitle);
    notification.append(notificationText);
    notification.append(notificationBtn);
    notification.classList.add('active');
  
    const body = document.querySelector('body');
    body.append(notification);

    notificationBtn.addEventListener('click', function() {
      playerCards.replaceChildren();
      dealerCards.replaceChildren();
  
      playerCards.setAttribute('class', 'player');
      dealerCards.setAttribute('class', 'dealer');
      
      playerCards.innerHTML = `<div id="player-placeholder" class="card blank"></div>`;
      dealerCards.innerHTML = `<div id="dealer-placeholder" class="card blank"></div>`;

      playerScore = 0;
      dealerScore = 0;
      
      playerTurn = true;
      turn.setAttribute('class', 'turn')
      notification.setAttribute('class', 'notification');
    })
  }


  
  

  drawBtn.addEventListener('click', function() {
    if(playerTurn) {
      let playerCard = null;
      [playerCard, playerScore] = pullCard(playerScore);
      const placeHolder = document.querySelector('#player-placeholder');
      if (playerCards.contains(placeHolder)) {
        playerCards.removeChild(placeHolder);
      }
      playerCards.append(playerCard);
      scoreCard.textContent = `Card Value: ${playerScore}`;
    
      if (playerScore > 21) {
        playerTurn = false
        playerCards.classList.add('bust');
        dealerCards.classList.add('win');
        notify('lose');
        
      } else if (playerScore == 21) {
        playerTurn = false
        playerCards.classList.add('win');
        dealerCards.classList.add('lose');
        notify('win');
      }   
    }
  })
  stayBtn.addEventListener('click', function() {
    turn.classList.add('change');
    playerTurn = false;
    turn.textContent = "Dealer's turn"
    const dealerPlaceholder = document.querySelector('#dealer-placeholder');
    function dealCards() {
      if (dealerScore > 21) {
        dealerCards.classList.add('bust');
        playerCards.classList.add('win');
        notify('win');
        return;
      } else if (dealerScore == 21 || dealerScore > playerScore) {
        dealerCards.classList.add('win');
        playerCards.classList.add('lose')
        console.log(dealerScore);
        notify('lose');
        return;
      }
      
      setTimeout(function() {
        if (dealerCards.contains(dealerPlaceholder)) {
          dealerCards.removeChild(dealerPlaceholder);
        }
        [dealerCard, dealerScore] = pullCard(dealerScore);
        dealerCards.append(dealerCard);
        
        dealCards();
      }, 1000); 
    }
    
    // Start the loop
    dealCards();
  
  })
})

