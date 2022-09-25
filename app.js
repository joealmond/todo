"esversion: 6";

const container = document.querySelector(".container");

const addButton = document.createElement("button");
addButton.textContent = "Add task";
container.appendChild(addButton);

const localStorageItems = Object.keys(localStorage);
localStorageItems.reverse().forEach((e) => {
  createNewTask("", window.localStorage.getItem(e).replace(/"/g, ""));
});

addButton.addEventListener("click", createNewTask);

function createNewTask(event, taskName = "") {
  const taskContainer = document.createElement("div");
  container.appendChild(taskContainer);

  const taskTextLabel = document.createElement("label");
  taskTextLabel.setAttribute("name", "task");
  taskTextLabel.textContent = " *  ";
  taskContainer.appendChild(taskTextLabel);

  const taskTextInput = document.createElement("input");
  const textInputAtrributes = {
    type: "text",
    id: "taskText",
    name: "task",
    required: "true",
    minlength: "4",
    maxlength: "20",
    size: "22",
    value: taskName,
    placeholder: "enter task name",
  };

  Object.keys(textInputAtrributes).forEach((e) => {
    taskTextInput.setAttribute(e, textInputAtrributes[e]);
  });

  taskContainer.appendChild(taskTextInput);
  taskTextInput.focus();
  taskTextInput.addEventListener("blur", (e) => {
    if (e.target.value == "") {
      e.target.parentElement.remove();
    }
  });

  taskTextInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      window.localStorage.setItem(
        e.target.value,
        JSON.stringify(e.target.value)
      );
      createNewTask();
    }
  });

  //   const taskCheckbox = document.createElement("input");
  //   const checkboxAtrributes = {
  //     type: "checkbox",
  //     id: "taskCheckbox",
  //     name: "task",
  //   };
  //   Object.keys(checkboxAtrributes).forEach((e) => {
  //     taskCheckbox.setAttribute(e, checkboxAtrributes[e]);
  //   });
  //   taskContainer.appendChild(taskCheckbox);

  const taskRemoveBtn = document.createElement("button");
  taskRemoveBtn.textContent = "Done";
  const removeBtnAtrributes = {
    id: "taskRemoveBtn",
    name: "task",
  };
  Object.keys(removeBtnAtrributes).forEach((e) => {
    taskRemoveBtn.setAttribute(e, removeBtnAtrributes[e]);
  });

  taskContainer.appendChild(taskRemoveBtn);

  taskRemoveBtn.addEventListener("click", removeTask);
}

function removeTask(e) {
  e.target.parentElement.remove();
  window.localStorage.removeItem(e.target.previousElementSibling.value);
}
