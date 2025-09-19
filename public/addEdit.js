import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showTasks } from "./tasks.js";

let addEditDiv = null;
let company = null;
let title = null;
let status = null;
let recurrence = null;
let addingTask = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-task");
  company = document.getElementById("title");
  status = document.getElementById("status");
  recurrence = document.getElementById("recurrence");
  addingTask = document.getElementById("adding-task");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingTask) {
        showTasks();
      } else if (e.target === editCancel) {
        showTasks();
      }
    }
  });
};

export const showAddEdit = (task) => {
  message.textContent = "";
  setDiv(addEditDiv);
};
