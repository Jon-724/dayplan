
function getRandomLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
}

const letterElement = document.getElementById("letter");
const button = document.getElementById("generateletter");

button.addEventListener("click", () => {
    const randomLetter = getRandomLetter();
    letterElement.textContent = randomLetter;
});
