document.addEventListener("DOMContentLoaded", function () {
  const tasks = [
  ["30 pushups", 10],
  ["40 Squats", 15],
  ["50 Situps", 15],
  ["60 pushups", 30],
  ["Boxing (4 minutes)", 10],
  ["Brushing teeth (in the morning)", 5],
  ["Cleaning shoes", 5],
  ["Cleaning up the room (5 minutes)", 10],
  ["Cooking (15 minutes)", 10],
  ["creative stuff (10 minutes)", 10],
  ["Driving lesson", 25],
  ["Going outside (15 minutes)", 15],
  ["Helping (15 minutes)", 5],
  ["Homework (1 hour)", 100],
  ["Homework (30 minutes)", 40],
  ["Homework (5 minutes)", 5],
  ["Jogging (30 minutes)", 50],
  ["Lifting weights (3 minutes)", 15],
  ["Piano lesson", 10],
  ["Plank (2 minutes)", 10],
  ["Podcast (15 minutes)", 10],
  ["Practicing driving (15 minutes)", 10],
  ["Practicing karate (5 minutes)", 5],
  ["Practicing piano (5 minutes)", 5],
  ["Programming (20 minutes)", 20],
  ["Reading (15 minutes)", 10],
  ["Reading (30 minutes)", 25],
  ["Shadowboxing (5 minutes)", 10],
  ["Talking a shower", 10],
  ["Training", 25],
  ["Trampolin (10 minutes)", 15],
  ["Workout (10 minutes)", 25],
  ["Workout (5 minutes)", 10],
  ["Playing Computer (30 minutes)", -10],
  ["2+ hours smartphone screentime", -10],
  ["3+ hours smartphone screentime", -15],
  ["4+ hours smartphone screentime", -20],
];

  let totalPoints = parseInt(localStorage.getItem("points")) || 0;
  let selected = JSON.parse(localStorage.getItem("selected")) || [];

  function updateDisplay() {
    document.getElementById("points").innerText = totalPoints;
    const list = document.getElementById("selected-tasks");
    list.innerHTML = "";
    selected.forEach((t, index) => {
      const item = document.createElement("div");
      item.innerHTML = `${t.name} (${t.points > 0 ? '+' : ''}${t.points} Punkte) <button onclick="removeTask(${index})">-</button>`;
      list.appendChild(item);
    });
  }

  function addPoints(name, points) {
    totalPoints += points;
    selected.push({ name, points });
    save();
    updateDisplay();
  }

  function removeTask(index) {
    totalPoints -= selected[index].points;
    selected.splice(index, 1);
    save();
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

  function save() {
    localStorage.setItem("points", totalPoints);
    localStorage.setItem("selected", JSON.stringify(selected));
  }

  function createTaskButtons() {
    const container = document.getElementById("task-list");
    tasks.forEach(([name, points]) => {
      const task = document.createElement("div");
      task.className = "task";

      const btnPlus = document.createElement("button");
      btnPlus.textContent = "+";
      btnPlus.onclick = () => addPoints(name, points);

const nameSpan = document.createElement("span");
nameSpan.textContent = `${name} (${points > 0 ? '+' : ''}${points})`;
nameSpan.style.marginRight = "10px"; 

task.appendChild(nameSpan);
task.appendChild(btnPlus);

      container.appendChild(task);
    });
  }

  createTaskButtons();
  updateDisplay();

  window.resetDay = resetDay;
  window.removeTask = removeTask;
});
