const tasks = [
  { text: "10 Minuten Sport", points: 20 },
  { text: "30 Minuten Lesen", points: 30 },
  { text: "Spazieren gehen", points: 25 },
  { text: "Zimmer aufräumen", points: 25 }
];

let totalPoints = 0;

const taskList = document.getElementById("task-list");
const pointsDisplay = document.getElementById("points");

function loadProgress() {
  const saved = JSON.parse(localStorage.getItem("planner-tasks")) || {};
  tasks.forEach((task, index) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "task-" + index;
    checkbox.checked = saved[index] || false;
    checkbox.addEventListener("change", () => {
      saved[index] = checkbox.checked;
      localStorage.setItem("planner-tasks", JSON.stringify(saved));
      updatePoints();
    });

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = `${task.text} (+${task.points} Punkte)`;

    const container = document.createElement("div");
    container.appendChild(checkbox);
    container.appendChild(label);
    taskList.appendChild(container);
  });
  updatePoints();
}

function updatePoints() {
  const saved = JSON.parse(localStorage.getItem("planner-tasks")) || {};
  totalPoints = tasks.reduce((sum, task, index) => {
    return saved[index] ? sum + task.points : sum;
  }, 0);
  pointsDisplay.textContent = totalPoints;
}

function resetTasks() {
  localStorage.removeItem("planner-tasks");
  location.reload();
}

loadProgress();
