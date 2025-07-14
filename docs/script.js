const tasks = [
  ["Talking a shower", 10], ["Driving lesson", 25], ["Helping (1 hour)", 15],
  ["Podcast (30 minutes)", 20], ["Podcast (15 minutes)", 10], ["Reading (30 minutes)", 25],
  ["Plank (2 minutes)", 10], ["Cleaning shoes", 5], ["Going outside (1 hour)", 50],
  ["Training", 25], ["Piano lesson", 10], ["Going outside (30 minutes)", 30],
  ["Homework (1 hour)", 95], ["Homework (5 minutes)", 5], ["Reading (15 minutes)", 10],
  ["Helping (15 minutes)", 5], ["Cleaning up the room (5 minutes)", 10],
  ["Brushing teeth (in the morning)", 5], ["Fahrschule (30 minutes)", 20],
  ["Practicing piano (3 minutes)", 5], ["Homework (10 minutes)", 10],
  ["Going outside (15 minutes)", 15], ["50 Situps", 15], ["Shadowboxing (5 minutes)", 10],
  ["Jogging (30 minutes)", 50], ["Trampolin (10 minutes)", 15],
  ["Practicing karate (7 minutes)", 10], ["60 pushups", 30], ["30 pushups", 10],
  ["40 Squats", 15], ["Workout (15 minutes)", 35], ["Lifting weights (3 minutes)", 15],
  ["Boxing (4 minutes)", 10], ["Workout (10 minutes)", 25],
  ["Workout (5 minutes)", 10], ["Programming (20 minutes)", 20],
  ["Practicing piano (20 minutes)", 15], ["Homework (25 minutes)", 35],
  ["Homework (15 minutes)", 20],
  ["Playing Computer (30 minutes)", -10], ["2+ hours smartphone screentime", -10],
  ["3+ hours smartphone screentime", -10], ["4+ hours smartphone screentime", -10]
];

let totalPoints = parseInt(localStorage.getItem("points")) || 0;
let selected = JSON.parse(localStorage.getItem("selected")) || [];

function updateDisplay() {
  document.getElementById("points").innerText = totalPoints;
  const list = document.getElementById("selected-tasks");
  list.innerHTML = "";
  selected.forEach(t => {
    const item = document.createElement("div");
    item.textContent = `${t.name} (${t.points > 0 ? '+' : ''}${t.points} points)`;
    list.appendChild(item);
  });
}

function addPoints(name, points) {
  totalPoints += points;
  selected.push({ name, points });
  localStorage.setItem("points", totalPoints);
  localStorage.setItem("selected", JSON.stringify(selected));
  updateDisplay();
}

function resetDay() {
  if (confirm("Willst du den Tagesplan zurücksetzen?")) {
    totalPoints = 0;
    selected = [];
    localStorage.removeItem("points");
    localStorage.removeItem("selected");
    updateDisplay();
  }
}

function createTaskButtons() {
  const container = document.getElementById("task-list");
  tasks.forEach(([name, points]) => {
    const task = document.createElement("div");
    task.className = "task";
    const btn = document.createElement("button");
    btn.textContent = "+";
    btn.onclick = () => addPoints(name, points);
    task.innerHTML = `<span>${name} (${points > 0 ? '+' : ''}${points})</span>`;
    task.appendChild(btn);
    container.appendChild(task);
  });
}

createTaskButtons();
updateDisplay();

