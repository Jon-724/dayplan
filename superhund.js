let hunger = 50;
let energy = 50;
let fun = 50;
let intelligence = 0;
let alive = true;
let score = 0;
let gameInterval;


function updateStats() {
    document.getElementById("hunger").textContent = hunger;
    document.getElementById("energy").textContent = energy;
    document.getElementById("fun").textContent = fun;
    document.getElementById("intelligence").textContent = intelligence;
}


function speak(text, duration = 2000) {
    const speechDiv = document.getElementById("speech");
    speechDiv.textContent = text;
    speechDiv.style.opacity = 1;

    setTimeout(() => {
        speechDiv.style.opacity = 0;
    }, duration);
}


function actionCooldown(animationClass, duration = 1000) {

    const buttons = document.querySelectorAll("#actions button");
    buttons.forEach(btn => btn.disabled = true);

    const dog = document.getElementById("dog");
    dog.classList.add(animationClass);

    setTimeout(() => {
        buttons.forEach(btn => btn.disabled = false);
        dog.classList.remove(animationClass);
    }, duration);
}

function füttern() {
    if (!alive) return;
    hunger += 20;
    energy -= 10;
    speak("hmm");
    updateStats();
    actionCooldown("feed", 1000);
    checkAlive();
}

function spielen() {
    if (!alive) return;
    fun += 10;
    energy -= 10;
    hunger -= 10;
    speak("Wuff Wuff!");
    updateStats();
    actionCooldown("play", 1000);
    checkAlive();
}

function schlafen() {
    if (!alive) return;
    energy += 30;
    hunger -= 10;
    fun -= 10;
    speak("zzz");
    updateStats();
    actionCooldown("sleep", 1000);
    checkAlive();
}

function rechnen() {
    if (!alive) return;
    energy -= 25;

    let num1 = Math.floor(Math.random() * 40) + 1;
    let num2 = Math.floor(Math.random() * 50) + 1;

    const operators = ["+", "-", "*", "/"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    if (operator === "/") {
        num1 = num2 * Math.floor(Math.random() * 15 + 1);
    }

    let correctAnswer;
    switch (operator) {
        case "+": correctAnswer = num1 + num2; break;
        case "-": correctAnswer = num1 - num2; break;
        case "*": correctAnswer = num1 * num2; break;
        case "/": correctAnswer = num1 / num2; break;
    }


    const decayInterval = setInterval(() => {
        intelligence -= 1;
        intelligence = Math.max(0, intelligence);
        updateStats();
    }, 500);

    actionCooldown("math", 2000);

    const userAnswer = prompt(`Sag mir was ist das Ergebnis? ${num1} ${operator} ${num2} = ?`);
    clearInterval(decayInterval);

    if (userAnswer != null && Number(userAnswer) === correctAnswer) {
        speak("Wuff Wuff 😎");
        intelligence += 10;
        fun += 5;
    } else {
        speak("wuff wuff... 😢");
        intelligence -= 5;
        fun -= 5;
        energy -= 5;
    }

    updateStats();
    checkAlive();
}




function decayStats() {
    hunger -= 1;
    energy -= 1;
    fun -= 1;
    score++;



intelligence = Math.max(0, Math.min(1000, intelligence));
fun = Math.max(0, Math.min(100, fun));
energy = Math.max(0, Math.min(100, energy));
hunger = Math.max(0, Math.min(100, hunger));



    updateStats();
    checkAlive();
}


function checkAlive() {
    if (hunger <= 0 || energy <= 0 || fun <= 0) {
        alive = false;
        clearInterval(gameInterval);
        speak("💀 Dein Hund ist gestorben...");
        score += intelligence;
        document.getElementById("actions").innerHTML = `<p>Dein Score: ${score} </p>`;
    }
}



function startGame() {
    updateStats();
    gameInterval = setInterval(decayStats, 6000);
}



startGame();
