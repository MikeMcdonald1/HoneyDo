import {
  inputEnabled,
  setDiv,
  message,
  setToken,
  token,
  enableInput,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";

let tasksDiv = null;
let tasksTable = null;
let tasksTableHeader = null;

export const handleTasks = () => {
  tasksDiv = document.getElementById("tasks");
  const logoff = document.getElementById("logoff");
  const addTask = document.getElementById("add-task");
  tasksTable = document.getElementById("tasks-table");
  tasksTableHeader = document.getElementById("tasks-table-header");

  tasksDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addTask) {
        showAddEdit(null);
      } else if (e.target === logoff) {
        showLoginRegister();
      }
    }
  });
};

export const showTasks = async () => {
  setDiv(tasksDiv);
};
