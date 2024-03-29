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
    alert("permetti centra il buco di farti fare la pipì");
    requestPermission();
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
  const squareSize = 50;
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

  // Crea un nuovo oggetto Audio
  var audio = new Audio("./music/urinate_standing-final-cut.mp3"); // Sostituisci con il percorso corretto
  audio.play(); // Inizia la riproduzione dell'audio

  gameTimer.innerText = `Tempo: ${timeLeft}s`;
  gameTimer.style.display = "block"; // Rende visibile il timer

  var timerInterval = setInterval(function () {
    timeLeft--;
    gameTimer.innerText = `Tempo: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameTimer.style.display = "none"; // Nasconde il timer
      audio.pause(); // Interrompe la riproduzione dell'audio
      // Aggiungi qui la logica alla fine del tempo
    }
  }, 1000);
}

/*logica punteggio*/
var currentScore = 0;

function updateScore() {
  var gameScore = document.getElementById("gameScore");
  gameScore.innerText = `Punteggio: ${currentScore}`;
  gameScore.style.display = "block"; // Rende visibile il punteggio

  // Aggiungi qui la logica per aggiornare il punteggio
  // Ad esempio, aumenta il punteggio di 50 punti ogni secondo se l'obiettivo è colpito
}

// Chiamata iniziale per impostare il punteggio a 0
// updateScore();

function hitTarget() {
  currentScore += 50;
  updateScore();
}

/*generazione casuale del water*/
function placeTargetRandomly() {
  var target = document.getElementById("target");
  var gameContainer = document.getElementById("gameContainer");

  var maxWidth = gameContainer.offsetWidth - target.offsetWidth;
  var maxHeight = gameContainer.offsetHeight - target.offsetHeight;

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

function showRecords() {
  // Logica per mostrare i record delle partite
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

// Avvia lo schermo di caricamento quando la pagina è completamente caricata
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("requestPermissionButton").style.display = "none";
  showLoadingScreen();
});
