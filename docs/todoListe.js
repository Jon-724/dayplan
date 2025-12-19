class Todo {
  constructor(text, prio) {
    this.text = text;
    this.prio = prio;
    this.done = false;
  }
}

class TodoListe {
  constructor() {
    this.todos = [];
  }

  add(todo) {
    this.todos.push(todo);
    this.sortByPrio();
  }

  remove(index) {
    this.todos.splice(index, 1);
  }

  clear() {
    this.todos = [];
  }

  sortByPrio() {
    this.todos.sort((a, b) => a.prio - b.prio);
  }
}

const liste = new TodoListe();

const taskInput = document.getElementById("taskInput");
const prioInput = document.getElementById("prioInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const todoList = document.getElementById("todoList");

addBtn.addEventListener("click", addTodo);
clearBtn.addEventListener("click", clearList);

function addTodo() {
  const text = taskInput.value.trim();
  const prio = parseInt(prioInput.value);

  if (text === "" || isNaN(prio) || prio < 1 || prio > 10) return;

  liste.add(new Todo(text, prio));
  taskInput.value = "";
  prioInput.value = "";
  render();
}

function toggleDone(index) {
  liste.todos[index].done = !liste.todos[index].done;
  render();
}

function deleteTodo(index) {
  liste.remove(index);
  render();
}

function clearList() {
  if (confirm("Willst du wirklich alles löschen?")) {
    liste.clear();
    render();
  }
}

function render() {
  todoList.innerHTML = "";

  liste.todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    li.innerHTML = `
      <div class="todo-top">
        <strong>${todo.text}</strong>
        <span>Prio ${todo.prio}</span>
      </div>
      <div class="actions">
        <button onclick="toggleDone(${index})">✔</button>
        <button onclick="deleteTodo(${index})">✖</button>
      </div>
    `;

    todoList.appendChild(li);
  });
}
