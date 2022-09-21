const rockPlayer = document.getElementById("rock-player");
const paperPlayer = document.getElementById("paper-player");
const scissorPlayer = document.getElementById("scissor-player");

const rockComp = document.querySelector("#rock-comp");
const paperComp = document.querySelector("#paper-comp");
const scissorComp = document.querySelector("#scissor-comp");

const versus = document.querySelector("#win");

const resetButton = document.querySelector("#reset");

rockPlayer.addEventListener("click", () => {
  rockPlayer.classList.add("pick");
  paperPlayer.setAttribute("disabled", true);
  scissorPlayer.setAttribute("disabled", true);
  return pickOption(rockPlayer);
});
paperPlayer.addEventListener("click", () => {
  paperPlayer.classList.add("pick");
  rockPlayer.setAttribute("disabled", true);
  scissorPlayer.setAttribute("disabled", true);
  return pickOption(paperPlayer);
});

scissorPlayer.addEventListener("click", () => {
  scissorPlayer.classList.add("pick");
  rockPlayer.setAttribute("disabled", true);
  paperPlayer.setAttribute("disabled", true);
  return pickOption(scissorPlayer);
});

class Start {
  constructor() {
    this.playerName = "PLAYER 1";
    this.botName = "COM";
    this.playerOption;
    this.compOption;
    this.winner = "";
  }

  get getPlayerOption() {
    return this.playerOption;
  }

  set setPlayerOption(option) {
    this.playerOption = option;
  }

  get getCompOption() {
    return this.compOption;
  }

  set setCompOption(option) {
    this.compOption = option;
  }

  compRandom() {
    const option = [rockComp, paperComp, scissorComp];
    const bot = option[Math.floor(Math.random() * option.length)];
    bot.classList.add("pick");
    return bot;
  }

  winRules() {
    if (this.compOption == paperComp && this.playerOption == scissorPlayer) {
      this.winner = this.playerName;
    } else if (this.compOption == paperComp && this.playerOption == rockPlayer) {
      this.winner = this.botName;
    } else if (this.compOption == scissorComp && this.playerOption == paperPlayer) {
      this.winner = this.botName;
    } else if (this.compOption == scissorComp && this.playerOption == rockPlayer) {
      this.winner = this.playerName;
    } else if (this.compOption == rockComp && this.playerOption == paperPlayer) {
      this.winner = this.playerName;
    } else if (this.compOption == rockComp && this.playerOption == scissorPlayer) {
      this.winner = this.botName;
    } else {
      this.winner = "DRAW";
    }
    return this.winner;
  }

  matchResult() {
    if (this.winner != "DRAW") {
      versus.classList.remove("versus");
      versus.classList.add("winner");
      versus.innerText = `${this.winner} \n WIN`;
      return;
    } else {
      versus.classList.add("winner");
      versus.innerText = "DRAW";
      return;
    }
  }
}

function pickOption(params) {
  const start = new Start();
  start.playerOption = params;
  start.setCompOption = start.compRandom();
  start.winRules();
  start.matchResult();
}

resetButton.addEventListener("click", () => {
  rockPlayer.classList.remove("pick");
  paperPlayer.classList.remove("pick");
  scissorPlayer.classList.remove("pick");
  rockPlayer.removeAttribute("disabled");
  paperPlayer.removeAttribute("disabled");
  scissorPlayer.removeAttribute("disabled");
  rockComp.classList.remove("pick");
  paperComp.classList.remove("pick");
  scissorComp.classList.remove("pick");
  versus.classList.remove("winner");
  versus.classList.add("versus");
  versus.innerText = "VS";
});
