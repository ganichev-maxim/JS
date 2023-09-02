(function() {
  let game;
  let gameView;

  function generatePairs(size) {
    let pairsCount = size ** 2 / 2;
    let result = [];
    for (let index = 1; index <= pairsCount; index++) {
      result.push(index);
      result.push(index);
    }
    return result;
  }

  function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
      let temp = array[i];
      let randIndex = getRandomIndex(array);
      array[i] = array[randIndex];
      array[randIndex] = temp;
    }
    return array;
  }

  function getRandomIndex(array) {
    return Math.round(Math.random() * (array.length - 1));
  }

  function createPresetGame(container) {

    function createCardsInput() {
      let id = "elementCount";
      let div = document.createElement("div");
      div.classList.add('form-group');
      let label = document.createElement("label")
      label.for = id;
      label.innerText = "Количество карточек по вертикали/горизонтали";
      div.append(label);
      let input = document.createElement("input");
      input.classList.add('form-control');
      input.id = id;
      input.type = 'number'
      input.required = true;
      div.append(input);
      return {block : div,
          input};
    }

    function createPresetSubmit(container, input) {
      let button = document.createElement('button');
      button.innerText = 'Начать игру';
      button.classList.add('btn', 'btn-success', 'btn-lg');
      button.type = 'submit';
      return button;
    }

    container.innerHTML = '';
    let form = document.createElement('form');
    let preset = createCardsInput();
    form.append(preset.block);
    form.append(createPresetSubmit(container, preset.input));
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      createPairsGame(container, parseInt(preset.input.value));
      return false;
    });
    container.append(form);
  }

  function createPairsGame(container, size = 4) {
    size = isNaN(size) || size % 2 === 1 || size < 2 || size > 10 ? 4 : size;
    container.innerHTML = '';
    game = createGame(size);
    let gameField = createGameFiled(size);
    let resetButton = createResetButton(container);
    allCards = gameField.cardButtons;
    container.classList.add('game');
    container.append(gameField.cardList);
    container.append(resetButton);
    gameView = {
      gameField,
      resetButton
    }
  }

  function createGame(size) {
    return {
      cards: shuffle(generatePairs(size)),
      openedCardPositions: [],
      selectedCardPositions: [],
      finished: false,
      addSelected: function(index) {
        if (!this.openedCardPositions.includes(index) && !this.selectedCardPositions.includes(index)) {
          this.selectedCardPositions.push(index);
        }
      },
      isMaxSelected: function() {
        return this.selectedCardPositions.length === 2;
      },
      resetSelected: function() {
        this.selectedCardPositions = [];
      },
      handleSelected: function(index) {
        this.addSelected(index);
        if (this.isMaxSelected()) {
          let result = this.cards[this.selectedCardPositions[0]] === this.cards[this.selectedCardPositions[1]];
          if (result) {
            this.openedCardPositions = this.openedCardPositions.concat(this.selectedCardPositions);
          }
          let selected = this.selectedCardPositions
          this.resetSelected();
          if (this.cards.length === this.openedCardPositions.length) {
            this.finished = true;
          }
          return {result,
            selected
          };
        }
        return {result: null,
          selected: []
        };
      }
    }
  }

  function createGameFiled(size) {
    let cardList = document.createElement('ul');
    cardList.classList.add('game__field', 'd-flex', 'flex-wrap');
    cardList.style.setProperty('--offsets', size - 1);
    let cardButtons = [];
    for (const cardIndex in game.cards) {
      let card = createCard(parseInt(cardIndex));
      cardList.append(card.card);
      cardButtons.push(card.cardButton);
    }
    return {cardList, cardButtons};
  }

  function createCard(cardIndex) {
    let card = document.createElement('li');
    let cardButton = document.createElement('button');
    cardButton.classList.add('game__card-button');
    cardButton.addEventListener('click', function(event) {
      openCard(cardIndex);
    });
    cardButton.id = getCardId(cardIndex);
    card.append(cardButton);
    card.classList.add('game__card');
    return {card, cardButton};
  }

  function getCardId(cardIndex) {
    return 'card' + cardIndex;;
  }

  function openCard(cardIndex) {
    let cardElement = document.getElementById(getCardId(cardIndex));
    cardElement.innerText = game.cards[cardIndex];
    let handle = game.handleSelected(cardIndex);
    if (handle.result === false) {
      setTimeout(() => closeCards(handle.selected), 500);
    } else if (handle.result === true) {
      handleCorrectChoice(handle.selected);
    }
    if (game.finished) {
      gameView.resetButton.classList.remove('invisible');
    }
  }

  function closeCards(indexes) {
    for (const index of indexes) {
      document.getElementById(getCardId(index)).innerText = '';
    }
  }

  function handleCorrectChoice(indexes) {
    for (const index of indexes) {
      document.getElementById(getCardId(index)).classList.add('game__card-button_correct');
    }
  }

  function createResetButton(container) {
    let button = document.createElement('button');
    button.innerText = 'Сыграть ещё раз';
    button.classList.add('invisible', 'btn', 'btn-success', 'btn-lg');
    button.addEventListener('click', function() {
      createPresetGame(container);
    })
    return button;
  }

  window.createPresetGame = createPresetGame;
})();
