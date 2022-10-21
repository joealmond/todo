/*jshint esversion: 6 */
let localStorageItems = Object.keys(localStorage);
let currentId = 0;
let taskName = "";
const addButton = document.createElement("button");
addButton.textContent = "Add task";
const container = document.querySelector(".container");

function displayTasks() {
  container.innerHTML = "";
  localStorageItems = Object.keys(localStorage);
  localStorageItems
    .sort((a, b) => a - b)
    .forEach((e) => {
      readTasks(e, window.localStorage.getItem(e).slice(1, -1));
    });
  document.body.appendChild(addButton);
}

function nextId() {
  localStorageItems = Object.keys(localStorage);
  let maxId = +localStorageItems.sort((a, b) => a - b).reverse()[0] || 0;
  return maxId + 1;
}

function readTasks(taskKey, taskName = "") {
  const taskContainer = document.createElement("div");
  container.appendChild(taskContainer);
  const taskTextLabel = document.createElement("label");
  taskTextLabel.setAttribute("name", "task");
  taskTextLabel.textContent = " *  ";
  taskContainer.appendChild(taskTextLabel);
  const taskTextInput = document.createElement("input");
  const textInputAtrributes = {
    type: "text",
    id: taskKey,
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

  taskTextInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      window.localStorage.setItem(currentId, JSON.stringify(e.target.value));
      createNewTask();
    }
  });

  taskTextInput.addEventListener("focus", updateTask);

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

  function updateTask(e) {
    let key = e.target.id;
    e.target.replaceWith(e.target.cloneNode(true));
    let elem = document.getElementById(key);
    elem.addEventListener("blur", textInputBlur);
    elem.addEventListener("keypress", enterText);

    function enterText(e) {
      elem.removeEventListener("blur", textInputBlur);
      if (e.key == "Enter" && e.target.value != "") {
        window.localStorage.setItem(key, JSON.stringify(e.target.value));
      }
      elem.addEventListener("blur", textInputBlur);
    }

    function textInputBlur(e) {
      if (e.target.value == "") {
        e.target.parentElement.remove();
        document.body.appendChild(addButton);
      } else {
        elem.removeEventListener("keypress", enterText);
        window.localStorage.setItem(key, JSON.stringify(e.target.value));
        document.body.appendChild(addButton);
      }
    }
  }
}

function createNewTask(event, taskName = "") {
  const taskContainer = document.createElement("div");
  container.appendChild(taskContainer);
  const taskTextLabel = document.createElement("label");
  taskTextLabel.setAttribute("name", "task");
  taskTextLabel.textContent = " *  ";
  taskContainer.appendChild(taskTextLabel);
  const taskTextInput = document.createElement("input");
  currentId = nextId();
  const textInputAtrributes = {
    type: "text",
    id: currentId,
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

  taskTextInput.addEventListener("keypress", enterText);

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

  addButton.remove();
  document.getElementById(`${currentId}`).focus();
  taskTextInput.addEventListener("blur", textInputBlur);

  function enterText(e) {
    function updateTask(e) {
      let key = e.target.id;
      e.target.replaceWith(e.target.cloneNode(true));
      let elem = document.getElementById(key);
      elem.addEventListener("blur", textInputBlur);
      elem.addEventListener("keypress", enterText);

      function enterText(e) {
        elem.removeEventListener("blur", textInputBlur);
        if (e.key == "Enter" && e.target.value != "") {
          window.localStorage.setItem(key, JSON.stringify(e.target.value));
          console.log("1");
        }
        elem.addEventListener("blur", textInputBlur);
      }

      function textInputBlur(e) {
        if (e.target.value == "") {
          e.target.parentElement.remove();
          document.body.appendChild(addButton);
        } else {
          elem.removeEventListener("keypress", enterText);
          window.localStorage.setItem(key, JSON.stringify(e.target.value));
          console.log("2");
          document.body.appendChild(addButton);
        }
      }
    }
    taskTextInput.removeEventListener("blur", textInputBlur);
    if (e.key == "Enter" && e.target.value != "") {
      window.localStorage.setItem(currentId, JSON.stringify(e.target.value));
      console.log("3");
      taskTextInput.addEventListener("focus", updateTask);
      if (e.target.value != "") createNewTask();
    }
    taskTextInput.addEventListener("blur", textInputBlur);
  }

  function textInputBlur(e) {
    function updateTask(e) {
      let key = e.target.id;
      e.target.replaceWith(e.target.cloneNode(true));
      let elem = document.getElementById(key);
      elem.addEventListener("blur", textInputBlur);
      elem.addEventListener("keypress", enterText);

      function enterText(e) {
        elem.removeEventListener("blur", textInputBlur);
        if (e.key == "Enter" && e.target.value != "") {
          window.localStorage.setItem(key, JSON.stringify(e.target.value));
        }
        elem.addEventListener("blur", textInputBlur);
      }

      function textInputBlur(e) {
        if (e.target.value == "") {
          e.target.parentElement.remove();
          document.body.appendChild(addButton);
        } else {
          elem.removeEventListener("keypress", enterText);
          window.localStorage.setItem(key, JSON.stringify(e.target.value));
          document.body.appendChild(addButton);
        }
      }
    }
    if (e.target.value == "") {
      e.target.parentElement.remove();
      document.body.appendChild(addButton);
    } else {
      taskTextInput.removeEventListener("keypress", enterText);
      window.localStorage.setItem(currentId, JSON.stringify(e.target.value));
      taskTextInput.addEventListener("focus", updateTask);
      document.body.appendChild(addButton);
    }
  }
}

function removeTask(e) {
  e.target.parentElement.remove();
  window.localStorage.removeItem(e.target.previousElementSibling.id);
}

/* TODO implemet update*/

// Main program

displayTasks();

addButton.addEventListener("click", createNewTask);
document.addEventListener("visibilitychange", displayTasks);

// console.log(currentId);
// const currentTaskTextInput = document.getElementById(`${currentId}`);
// currentTaskTextInput.focus();
// currentTaskTextInput.addEventListener("blur", console.log(currentId));
