const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const toggleTheme = document.getElementById("toggleTheme");

let draggedItem = null;

/* Load tasks from localStorage */
window.addEventListener("load", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(({ text, color }) => {
    const el = createTaskElement(text, color);
    taskList.appendChild(el);
  });

  const darkMode = localStorage.getItem("darkMode") === "true";
  document.body.classList.toggle("dark-mode", darkMode);
});

/* Save tasks to localStorage */
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll(".task-item").forEach((note) => {
    const text = note.querySelector("span").innerText;
    const color = note.style.backgroundColor;
    tasks.push({ text, color });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Add task */
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task.");
  const taskItem = createTaskElement(taskText);
  taskList.appendChild(taskItem);
  taskInput.value = "";
  saveTasks();
});

/* Tooltip button creator */
function createTooltipButton(icon, tooltipText, clickHandler) {
  const wrapper = document.createElement("div");
  wrapper.className = "tooltip-wrapper";

  const button = document.createElement("button");
  button.textContent = icon;

  const tooltip = document.createElement("span");
  tooltip.className = "custom-tooltip";
  tooltip.textContent = tooltipText;

  wrapper.appendChild(button);
  wrapper.appendChild(tooltip);
  if (clickHandler) button.addEventListener("click", clickHandler);

  return { wrapper, button, tooltip };
}

/* Create task element */
function createTaskElement(text, customColor = null) {
  const div = document.createElement("div");
  div.className = "task-item";
  div.style.backgroundColor = customColor || getRandomColor();
  div.setAttribute("draggable", true);

  const taskText = document.createElement("span");
  taskText.innerText = text;

  const textWrapper = document.createElement("div");
  textWrapper.className = "tooltip-wrapper";
  const taskTooltip = document.createElement("span");
  taskTooltip.className = "custom-tooltip";
  taskTooltip.textContent = "Task text";
  textWrapper.appendChild(taskText);
  textWrapper.appendChild(taskTooltip);

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = text;
  inputField.style.display = "none";

  const buttons = document.createElement("div");
  buttons.className = "task-buttons";

  const {
    wrapper: editWrapper,
    button: editBtn,
    tooltip: editTooltip,
  } = createTooltipButton("✏️", "Edit Task", () => {
    if (editBtn.textContent === "✏️") {
      taskText.style.display = "none";
      inputField.style.display = "inline";
      editBtn.textContent = "💾";
      editTooltip.textContent = "Save Task";
    } else {
      const updatedText = inputField.value.trim();
      if (updatedText !== "") {
        taskText.innerText = updatedText;
        taskText.style.display = "inline";
        inputField.style.display = "none";
        editBtn.textContent = "✏️";
        editTooltip.textContent = "Edit Task";
        saveTasks();
      } else {
        alert("Task cannot be empty.");
      }
    }
  });

  const { wrapper: deleteWrapper } = createTooltipButton(
    "❌",
    "Delete Task",
    () => {
      div.remove();
      saveTasks();
    }
  );

  buttons.appendChild(editWrapper);
  buttons.appendChild(deleteWrapper);

  div.appendChild(textWrapper);
  div.appendChild(inputField);
  div.appendChild(buttons);

  /* Drag Events */
  div.addEventListener("dragstart", () => {
    draggedItem = div;
    div.classList.add("dragging");
  });

  div.addEventListener("dragend", () => {
    draggedItem = null;
    div.classList.remove("dragging");
    saveTasks();
  });

  div.addEventListener("dragover", (e) => e.preventDefault());

  div.addEventListener("drop", () => {
    if (draggedItem && draggedItem !== div) {
      taskList.insertBefore(draggedItem, div);
    }
  });

  return div;
}

/* Random pastel colors */
function getRandomColor() {
  const colors = [
    "#ffd166",
    "#f9c74f",
    "#f4a261",
    "#ffb5e8",
    "#caffbf",
    "#b5ead7",
    "#ffdac1",
    "#cdeac0",
    "#ffc8dd",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/* Theme toggle */
toggleTheme.addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", dark);
  toggleTheme.textContent = dark ? "🌞" : "🌙";
});

/* Footer Clock */
function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString();
  clock.textContent = `${date} ${time}`;
}
setInterval(updateClock, 1000);
updateClock();