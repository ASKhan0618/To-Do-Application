// Get references to DOM elements
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Add Task Button Click
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const taskItem = createTaskElement(taskText);
  taskList.appendChild(taskItem);
  taskInput.value = "";
});

// Create tooltip-enabled button with custom tooltip
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

// Create a sticky note task element
function createTaskElement(text) {
  const div = document.createElement("div");
  div.className = "task-item";
  div.style.backgroundColor = getRandomColor();

  const taskText = document.createElement("span");
  taskText.innerText = text;

  // Wrap task text in a tooltip
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

  // Create edit button with tooltip
  const { wrapper: editWrapper, button: editBtn, tooltip: editTooltip } = createTooltipButton("✏️", "Edit Task", () => {
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
      } else {
        alert("Task cannot be empty.");
      }
    }
  });

  // Create delete button with tooltip
  const { wrapper: deleteWrapper } = createTooltipButton("❌", "Delete Task", () => {
    div.remove();
  });

  buttons.appendChild(editWrapper);
  buttons.appendChild(deleteWrapper);

  div.appendChild(textWrapper);
  div.appendChild(inputField);
  div.appendChild(buttons);

  return div;
}

// Optional: Random sticky note colors
function getRandomColor() {
  const colors = [
    '#ffd166',
    '#f9c74f',
    '#f4a261',
    '#ffb5e8',
    '#caffbf',
    '#b5ead7',
    '#ffdac1',
    '#cdeac0',
    '#ffc8dd'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}