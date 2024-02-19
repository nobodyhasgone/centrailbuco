// Inizializzazione delle tracce audio
var menuMusic = new Audio("./music/573_full_racer-8bit_0158_preview.mp3"); // Percorso della musica del menu
var gameMusic = new Audio("./music/urinate_standing_cut.mp3"); // Percorso della musica di gioco
var audioEnabled = true; // Stato iniziale dell'audio
var audio; // Variabile globale per l'audio della partita

// Funzione per mostrare lo schermo di caricamento
function showLoadingScreen() {
  document.getElementById("loadingScreen").style.display = "flex";

  // Rimuove lo schermo di caricamento dopo 3 secondi
  setTimeout(function () {
    document.getElementById("loadingScreen").style.display = "none";
    createGameMenu(); // Mostra il menu di gioco dopo lo schermo di caricamento
  }, 3000);
}

// Funzione per creare il menu di gioco
function createGameMenu() {
  document.getElementById("mainMenu").style.display = "flex";
  document.getElementById("startText").addEventListener("click", startGame);
  document.getElementById("creditsLink").addEventListener("click", showCredits);
  document.getElementById("recordLink").addEventListener("click", showRecords);
  document.getElementById("howtoplay").addEventListener("click", howToPlay);
}

function startGame() {
  // Nasconde il menu principale
  document.getElementById("mainMenu").style.display = "none";
  if (navigator.userAgent.includes("iPhone")) {
    requestPermission();
  }
  if (audioEnabled) {
    menuMusic.pause();
    gameMusic.play();
  }

  prepareGameContainer(); // initializeCountdown(); sarà chiamata da qui
  setupGyroControls();
}

function prepareGameContainer() {
  var gameContainer = document.getElementById("gameContainer");
  gameContainer.style.display = "grid";

  createBackgroundSquares(gameContainer);
  initializeCountdown(); // startGameAfterCountdown() sarà chiamata da qui
  setInterval(placeTargetRandomly, 5000);
}

function createBackgroundSquares(container) {
  const numberOfSquares = calculateNumberOfSquares();
  for (let i = 0; i < numberOfSquares; i++) {
    let square = document.createElement("div");
    square.classList.add("game-square");
    container.appendChild(square);
  }
}

function calculateNumberOfSquares() {
  const squareSize = 90;
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  const squaresPerRow = Math.floor(containerWidth / squareSize);
  const numberOfRows = Math.floor(containerHeight / squareSize);
  return squaresPerRow * numberOfRows;
}

function initializeCountdown() {
  // Implementa qui la logica per il conto alla rovescia
  var countdownCircle = document.getElementById("countdownCircle"); // Assicurarsi che sia presente in HTML
  countdownCircle.style.display = "flex"; // Mostra il cerchio del conto alla rovescia

  let countdown = 5;
  countdownCircle.innerText = countdown;
  console.log("primaditutto:" + countdown);
  let interval = setInterval(() => {
    countdown--;
    countdownCircle.innerText = countdown;
    if (countdown == 0) {
      console.log("after:" + countdown);
      clearInterval(interval);
      console.log("before:" + countdown);
      countdownCircle.remove();
      startGameAfterCountdown();
      updateScore();
    }
  }, 1000);
}

function startGameAfterCountdown() {
  // Qui si potrebbe avviare la logica specifica del gioco, come il movimento dei personaggi, timer di gioco, ecc.
  var gameTimer = document.getElementById("gameTimer");
  var timeLeft = 30; // Durata del timer in secondi

  // Assegna l'audio della partita alla variabile globale
  audio = new Audio("./music/urinate_standing_cut.mp3");

  if (audioEnabled) {
    audio.play();
  }

  gameTimer.innerText = `Tempo: ${timeLeft}s`;
  gameTimer.style.display = "block"; // Rende visibile il timer

  var timerInterval = setInterval(function () {
    timeLeft--;
    gameTimer.innerText = `Tempo: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameTimer.style.display = "none"; // Nasconde il timer
      endGame(); // Chiama la funzione di fine gioco
    }
  }, 1000);
  updateScore();
}

/*logica punteggio*/
var currentScore = 0;
let isTouching = false;
let lineEnd = false;

document
  .getElementById("gameTimer")
  .addEventListener("touchstart", function () {
    var alertDiv = document.getElementById("alertMessage");
    alertDiv.style.display = "block";

    setTimeout(function () {
      alertDiv.style.display = "none";
    }, 2000); // L'avviso scompare dopo 2 secondi
  });
document
  .getElementById("gameScore")
  .addEventListener("touchstart", function () {
    var alertDiv = document.getElementById("alertMessage2");
    alertDiv.style.display = "block";

    setTimeout(function () {
      alertDiv.style.display = "none";
    }, 2000); // L'avviso scompare dopo 2 secondi
  });
function updateScore() {
  var gameScore = document.getElementById("gameScore");
  gameScore.innerText = `Punteggio: ${currentScore}`;
  gameScore.style.display = "block"; // Rende visibile il punteggio

  // Aggiungi qui la logica per aggiornare il punteggio
  // Ad esempio, aumenta il punteggio di 50 punti ogni secondo se l'obiettivo è colpito
  setInterval(function () {
    console.log("Intervallo eseguito");
    var line = document.getElementById("line");
    var target = document.getElementById("target");

    var lineRect = line.getBoundingClientRect();
    var targetRect = target.getBoundingClientRect();

    if (
      lineRect.bottom >= targetRect.top &&
      lineRect.top <= targetRect.bottom &&
      lineRect.left < targetRect.right &&
      lineRect.right > targetRect.left
    ) {
      currentScore += 25;
      gameScore.innerText = `Punteggio: ${currentScore}`;
    }
  }, 1000);
}

// Chiamata iniziale per impostare il punteggio a 0

function hitTarget() {
  currentScore += 50;
  updateScore();
}

/*generazione casuale del water*/
function placeTargetRandomly() {
  var target = document.getElementById("target");
  var gameContainer = document.getElementById("gameContainer");

  var maxWidth = gameContainer.offsetWidth - target.offsetWidth;
  var maxHeight = gameContainer.offsetHeight - target.offsetHeight - 200; // KomMa dice: Ho sottratto 200 px all'alltezza dell'oggetto window in maniera tale che il water non possa spawnare sotto alla pisica.

  var randomX = Math.random() * maxWidth;
  var randomY = Math.random() * maxHeight;

  target.style.left = randomX + "px";
  target.style.top = randomY + "px";
}
function howToPlay() {
  // Logica per mostrare il regolamento
}

// Funzione per mostrare i crediti
function showCredits() {
  document.getElementById("mainMenu").style.display = "none"; // Nascondi il menu principale
  document.getElementById("creditsSection").style.display = "flex"; // Mostra i crediti
}
// Funzione per nascondere i crediti e tornare al menu principale
function hideCredits() {
  document.getElementById("creditsSection").style.display = "none"; // Nascondi i crediti
  document.getElementById("mainMenu").style.display = "flex"; // Mostra il menu principale
}
// Aggiungi l'event listener al bottone di uscita nella sezione dei crediti
document
  .getElementById("exitCreditsButton")
  .addEventListener("touchend", hideCredits);

document
  .getElementById("recordLink")
  .addEventListener("touchstart", showRecords);
document.getElementById("exitButton").addEventListener("touchend", function () {
  document.getElementById("recordSection").style.display = "none"; // Nasconde la sezione dei record
  document.getElementById("mainMenu").style.display = "flex"; // Mostra il menu principale
});

function showRecords() {
  // Seleziona la sezione dei record utilizzando il suo ID
  var recordSection = document.getElementById("recordSection");

  // Rendi visibile la sezione dei record
  recordSection.style.display = "block";

  // Opzionalmente, nascondi altre sezioni che non dovrebbero essere visibili
  // quando i record sono mostrati. Ad esempio:
  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("gameContainer").style.display = "none";
  // ... altri elementi o sezioni da nascondere ...

  // Qui puoi anche inserire qualsiasi altra logica necessaria,
  // come caricare o aggiornare i dati dei record.
}

// Funzione per mostrare la sezione How To Play
function showHowToPlay() {
  document.getElementById("mainMenu").style.display = "none"; // Nascondi il menu principale
  document.getElementById("howToPlaySection").style.display = "flex"; // Mostra How To Play
}

// Funzione per nascondere la sezione How To Play e tornare al menu principale
function hideHowToPlay() {
  document.getElementById("howToPlaySection").style.display = "none"; // Nascondi How To Play
  document.getElementById("mainMenu").style.display = "flex"; // Mostra il menu principale
}

// Aggiungi gli event listener ai bottoni
document
  .getElementById("howtoplay")
  .addEventListener("touchend", showHowToPlay);
document
  .getElementById("exitHowToPlayButton")
  .addEventListener("touchend", hideHowToPlay);

/*API per il giroscopio */
var permissionButton = document.getElementById("requestPermissionButton");
permissionButton.addEventListener("touchstart", requestPermission);

function requestPermission() {
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          setupGyroControls();
        } else {
          alert("Permesso accesso ai sensori di movimento negato.");
        }
      })
      .catch(console.error);
  } else {
    alert(
      "Il browser non supporta la richiesta di autorizzazione per accedere ai sensori di movimento."
    );
  }
}

function setupGyroControls() {
  if ("DeviceOrientationEvent" in window) {
    window.addEventListener("deviceorientation", handleOrientation, true);
  } else {
    console.log(
      "Il tuo dispositivo o browser non supporta DeviceOrientationEvent"
    );
  }
}

function handleOrientation(event) {
  var beta = event.beta; // Inclinazione frontale/posteriore
  var gamma = event.gamma; // Inclinazione sinistra/destra

  var line = document.getElementById("line");
  var rotationDeg = gamma;
  var length = Math.max(200, 200 + beta * 5);

  line.style.transform = `translateX(-50%) rotate(${rotationDeg}deg)`;
  line.style.height = `${length}px`;
}

// Funzione per aggiornare lo stato dell'audio
function updateAudioState(playMenu = true) {
  if (audioEnabled) {
    if (playMenu) {
      menuMusic.play();
    } else {
      gameMusic.play();
    }
  } else {
    menuMusic.pause();
    gameMusic.pause();
  }
}

// Event listener per il bottone dell'audio
document
  .getElementById("audioControlButton")
  .addEventListener("touchend", function () {
    audioEnabled = !audioEnabled; // Cambia lo stato dell'audio
    updateAudioState(
      document.getElementById("mainMenu").style.display !== "none"
    );
  });

function endGame() {
  // Interrompe la riproduzione della musica di gioco e del menu
  menuMusic.pause();
  gameMusic.pause();
  menuMusic.currentTime = 0;
  gameMusic.currentTime = 0;

  // Mostra la schermata di game over
  var gameOverScreen = document.getElementById("gameOverScreen");
  gameOverScreen.style.display = "flex";

  // Nasconde il container di gioco
  document.getElementById("gameContainer").style.display = "none";

  // Imposta i valori finali di tempo e punteggio
  document.getElementById("finalScore").textContent = `Score: ${currentScore}`;

  // Dopo 3 secondi, nasconde la schermata di game over e mostra il menu
  setTimeout(function () {
    gameOverScreen.style.display = "none";
    document.getElementById("mainMenu").style.display = "flex";
    updateAudioState(); // Riproduce la musica del menu se l'audio è abilitato
  }, 3000);
}

// Avvia lo schermo di caricamento quando la pagina è completamente caricata
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("requestPermissionButton").style.display = "none";
  showLoadingScreen();
  // Avvia l'audio del menu solo se l'audio è abilitato e il gioco non è attivo
  updateAudioState();
});
