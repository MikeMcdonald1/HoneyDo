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
        setToken(null);
        message.textContent = "You have been logged off.";
        tasksTable.replaceChildren([tasksTableHeader]);
        showLoginRegister();
      }
    }
  });
};

// export const showTasks = async () => {
//   setDiv(tasksDiv);
// };

export const showTasks = async () => {
  try {
    enableInput(false);

    const response = await fetch("/api/v1/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    let children = [tasksTableHeader];

    if (response.status === 200) {
      if (data.count === 0) {
        tasksTable.replaceChildren(...children); // clear this for safety
      } else {
        for (let i = 0; i < data.tasks.length; i++) {
          let rowEntry = document.createElement("tr");

          let editButton = `<td><button type="button" class="editButton" data-id=${data.tasks[i]._id}>edit</button></td>`;
          let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.tasks[i]._id}>delete</button></td>`;
          let rowHTML = `
            <td>${data.tasks[i].title}</td>
            <td>${data.tasks[i].status}</td>
            <td>${data.tasks[i].recurrence}</td>
            <div>${editButton}${deleteButton}</div>`;

          rowEntry.innerHTML = rowHTML;
          children.push(rowEntry);
        }
        tasksTable.replaceChildren(...children);
      }
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    console.log(err);
    message.textContent = "A communication error occurred.";
  }
  enableInput(true);
  setDiv(tasksDiv);
};
