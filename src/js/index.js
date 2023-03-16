// Global variables

const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");

const start = document.querySelector(".start");
const gameOver = document.querySelector(".game-over");
const time = document.querySelector(".time");
const scoreText = document.querySelector(".score");
const logoMario = document.querySelector(".logoSuperMario");

const scores = [];

const audioStart = new Audio("./audio/audio_theme.mp3");
let audioGameOver = new Audio("./audio/audio_gameover.mp3");
const jumpEffect = new Audio("./audio/pulo_mario.mp3");

let musicGameOver = false;

let score = 0;

let marioLife = true;

// Functions

const startGame = () => {
  start.style.display = "none";
  logoMario.style.display = "none";
  audioStart.play();
  pipe.classList.add("pipe-animation");
  loop();
};

const restartGame = () => {
  marioLife = true;
  mario.src = "./images/mario.gif";
  mario.style.width = "";
  mario.style.bottom = "";
  mario.style.marginLeft = "";
  pipe.style.right = "";
  pipe.style.left = "";
  gameOver.style.display = "none";
  time.style.display = "flex";
  score = 0;
  count();
  audioGameOver = new Audio("./audio/audio_gameover.mp3");
  audioGameOver.pause();
  audioGameOver.currentTime = 0;

  audioStart.currentTime = 0;
  audioStart.play();
};

const record = (array) => array.sort((a, b) => b - a);

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const count = () => {
  let numCount = 3;
  const timeH1 = document.createElement("h1");
  time.appendChild(timeH1);

  const interval = setInterval(() => {
    if (numCount !== 0) {
      timeH1.innerText = numCount;
      numCount--;
    } else if (numCount === 0) {
      time.removeChild(timeH1);
      increaseScore();
      time.style.display = "none";
      pipe.classList.add("pipe-animation");
      loop();
      clearInterval(interval);
    }
  }, 1000);
};

const loop = () => {
  setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");
    let lv = false;
    if (score >= 5 && pipePosition < -20 && score < 10) {
      pipe.classList.remove("pipe-animation");
      lv = true;
      setTimeout(() => {
        if (lv) {
          pipe.classList.add("pipe-animationLv2");
          lv = false;
        }
      }, 100);
    }
    if (score >= 10 && pipePosition < -20 && score < 20) {
      pipe.classList.remove("pipe-animationLv2");
      lv = true;
      setTimeout(() => {
        if (lv) {
          pipe.classList.add("pipe-animationLv3");
          lv = false;
        }
      }, 100);
    }
    if (score >= 20 && pipePosition < -20 && score < 30) {
      pipe.classList.remove("pipe-animationLv3");
      lv = true;
      setTimeout(() => {
        if (lv) {
          pipe.classList.add("pipe-animationLv4");
          lv = false;
        }
      }, 100);
    }
    if (score >= 30 && pipePosition < -20 && score < 40) {
      pipe.classList.remove("pipe-animationLv4");
      lv = true;
      setTimeout(() => {
        if (lv) {
          pipe.classList.add("pipe-animationLv5");
          lv = false;
        }
      }, 100);
    }
    if (score >= 40 && pipePosition < -20 && score < 50) {
      pipe.classList.remove("pipe-animationLv5");
      lv = true;
      setTimeout(() => {
        if (lv) {
          pipe.classList.add("pipe-animationLv6");
          lv = false;
        }
      }, 100);
    }
    if (score >= 50 && pipePosition < -20 && score < 60) {
      pipe.classList.remove("pipe-animationLv6");
      lv = true;
      setTimeout(() => {
        if (lv) {
          pipe.classList.add("pipe-animationLv7");
          lv = false;
        }
      }, 100);
    }
    if (score >= 60 && pipePosition < -20) {
      pipe.classList.remove("pipe-animationLv7");
      lv = true;
      setTimeout(() => {
        if (lv) {
          pipe.classList.add("pipe-animationLv8");
          lv = false;
        }
      }, 100);
    }

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      marioLife = false;
      musicGameOver = true;
      if (score < 5) {
        pipe.classList.remove("pipe-animation");
      } else if (score >= 5 && score < 10) {
        pipe.classList.remove("pipe-animationLv2");
      } else if (score >= 10 && score < 20) {
        pipe.classList.remove("pipe-animationLv3");
      } else if (score >= 20 && score < 30) {
        pipe.classList.remove("pipe-animationLv4");
      } else if (score >= 30 && score < 40) {
        pipe.classList.remove("pipe-animationLv5");
      } else if (score >= 40 && score < 50) {
        pipe.classList.remove("pipe-animationLv6");
      } else if (score >= 50 && score < 60) {
        pipe.classList.remove("pipe-animationLv7");
      } else if (score >= 60) {
        pipe.classList.remove("pipe-animationLv8");
      }

      pipe.style.left = `${pipePosition}px`;

      mario.style.bottom = `${marioPosition}px`;
      mario.src = "./images/game-over.png";
      mario.style.marginLeft = "50px";
      mario.style.width = "75px";

      scores.push(score);
      record(scores);
      gameOver.style.display = "flex";

      const showFinalScore = document.querySelector(".showFinalScore");
      showFinalScore.innerText = `Sua pontuação final foi: ${score}`;

      const showRecord = document.querySelector(".record");
      if (scores[0] === 0) {
        showRecord.innerText = `Você ainda não pulou nenhum cano para ter recorde :(`;
      } else if (scores[0] === 1) {
        showRecord.innerText = `Seu recorde foi ${scores[0]} cano pulado!!`;
      } else {
        showRecord.innerText = `Seu recorde foi ${scores[0]} canos pulados!!`;
      }

      scoreText.innerText = "";

      if (musicGameOver) {
        try {
          audioStart.pause();
          audioGameOver.currentTime = 0.7;
          audioGameOver.play();
          audioGameOver = false;
        } catch (error) {}
      }

      clearInterval(loop);
    }
  }, 10);
};

const increaseScore = () => {
  scoreText.innerText = score;
};

const showPipePosition = () => {
  setTimeout(() => {
    if (pipe.offsetLeft <= 400 && marioLife) {
      score++;
      increaseScore();
    }
  }, 180);
};

const jumpSong = () => {
  jumpEffect.play();
  jumpEffect.currentTime = 0;
};

// Event listeners

const loopJump = setInterval(() => {
  if (marioLife) {
    document.addEventListener("click", jump);
    document.addEventListener("click", jumpSong);
    document.addEventListener("keydown", jump);
    document.addEventListener("keydown", jumpSong);
  } else {
    document.removeEventListener("keydown", jump);
    document.removeEventListener("keydown", jumpSong);
    document.removeEventListener("click", jump);
    document.removeEventListener("click", jumpSong);
  }
}, 1000);

start.addEventListener("click", startGame);
document.querySelector(".btnGameOver").addEventListener("click", restartGame);

document.addEventListener("keydown", showPipePosition);
document.addEventListener("click", showPipePosition);
