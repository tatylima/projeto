//----- FUNCTIONS -----

// requer o prompt

const prompt = require("prompt-sync")();

// formata o texto como título

const formatStringToTitle = (text, separator = "-") => {
  let separatorLine = "";

  for (i = 0; i < text.length; i++)
    separatorLine = separatorLine.concat(separator);

  console.log(`\n${separatorLine}\n${text}\n${separatorLine}\n`);

};

// valida números inteiros > min

const validatePositiveIntMin = (question, errorMessage, min) => {
  while (true) {
    let num = prompt(`> ${question} `);

    if (!isNaN(num) && num >= min && num % 1 == 0) {
      return num;
    }

    console.log(`\n${errorMessage}\n`);
  }
};

// retorna valor inteiro aleatório ente min e max (inclusive min e max)

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

// construtor do objeto player

function Player(index, name, wins = 0) {
  (this.index = index), (this.name = name), (this.wins = wins);
}

//----- CODE START -----

formatStringToTitle("DICE GAME");

console.log(`+ mínimo 2 jogadores

vencedor da RODADA  - aquele que rolar o maior valor no dado.
vencedor da PARTIDA - aquele que vencer o maior número de rodadas.

`);


// solicita e valida jogadores e rodadas

console.log(`SELECIONE:\n`);

const numberOfPlayers = validatePositiveIntMin(
  "número de jogadores",
  "digite um NÚMERO INTEIRO >= 2",
  2
);

const numberOfRounds = validatePositiveIntMin(
  "número de rodadas",
  "digite um NÚMERO INTEIRO >= 1",
  1
);

console.log();

const playerObjectList = [];
let playerObject;

// cria um objeto para cada jogador

for (i = 0; i < numberOfPlayers; i++) {
  let playerName = prompt(`> nome do jogador ${i + 1}: `);
  playerObject = new Player(i, playerName);
  playerObjectList.push(playerObject);
}

console.log();
prompt("> digite ENTER para começar a partida ");

// repete pelo número de rodadas selecionado

for (j = 0; j < numberOfRounds; j++) {

  formatStringToTitle(`rodada ${j + 1}`);

  // define o resultado da rodada para cada jogador

  playerObjectList.forEach((instance) => {
    diceRoll = getRandomIntInclusive(1, 6);
    instance.result = diceRoll;
  });

  // exibe o resultado de cada jogador na rodada

  playerObjectList.forEach((instance) => {
    console.log(`\t${instance.name} rolou ${instance.result}`);
  });

  // organiza os objetos (player) por ordem decrescente de resultado (por rodada)

  playerObjectList.sort((a, b) => {
    return b.result - a.result;
  });

  // exibe o vencedor da rodada

  if (playerObjectList[0].result == playerObjectList[1].result) {
    console.log(`\nempate, ninguém vence a rodada.`);
  } else {
    console.log(`\no vencedor da rodada é ${playerObjectList[0].name}.`);
    playerObjectList[0].wins++;
  }

  if (j < numberOfRounds - 1) {
    console.log();
    prompt("> digite ENTER para próxima rodada ");
  } else {
    console.log();
    prompt("> digite ENTER para resultados da partida ");
  }

  // reseta os objetos (player) por ordem de entrada

  playerObjectList.sort((a, b) => {
    return a.index - b.index;
  });
}

formatStringToTitle("RESULTADOS");

// exibe o número de rodadas que cada jogador venceu

playerObjectList.forEach((instance) => {
  console.log(`\t${instance.name} - ${instance.wins} rodadas`);
});

// organiza os objetos (player) por ordem decrescente de vitórias

playerObjectList.sort((a, b) => {
  return b.wins - a.wins;
});

// exibe o vencedor da partida

if (playerObjectList[0].wins == playerObjectList[1].wins) {
  console.log(`\nempate, ninguém vence a partida.`);
} else {
  console.log(
    `\no vencedor da partida é ${playerObjectList[0].name}! `
  );
}
console.log();