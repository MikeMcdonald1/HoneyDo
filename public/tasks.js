import {
  inputEnabled,
  setDiv,
  message,
  setToken,
  token,
  enableInput,
  setHouseholdInfo,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";

let tasksDiv = null;
let tasksTable = null;
let tasksTableHeader = null;

// aka do this when a user clicks any button within the tasksDiv
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
        setHouseholdInfo(null);
        message.textContent = "You have been logged off.";
        //  tasksTable.replaceChildren([tasksTableHeader]);
        tasksTable.replaceChildren(tasksTableHeader);
        showLoginRegister();
      } else if (e.target.classList.contains("editButton")) {
        message.textContent = "";
        showAddEdit(e.target.dataset.id);
      } else if (e.target.classList.contains("deleteButton")) {
        message.textContent = "";
        handleDelete(e.target.dataset.id);
      }
    }
  });
};

// used to GET and display tasks
export const showTasks = async () => {
  try {
    enableInput(false);

    // fetch tasks using the GET method
    const response = await fetch("/api/v1/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // token might need to be changed to work with household instead of single user
        Authorization: `Bearer ${token}`,
      },
    });

    // parse the raw response into usable js object
    const data = await response.json();
    // create array called children that always has a header as the first element
    let children = [tasksTableHeader];

    if (response.status === 200) {
      if (data.count === 0) {
        tasksTable.replaceChildren(...children); // clear this for safety
      } else {
        for (let i = 0; i < data.tasks.length; i++) {
          // create an empty table row that is ready to fill
          let rowEntry = document.createElement("tr");

          let editButton = `<td><button type="button" class="editButton" data-id=${data.tasks[i]._id}>edit</button></td>`;
          // step 2 - create the actual delete button
          let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.tasks[i]._id}>delete</button></td>`;
          let rowHTML = `
            <td>${data.tasks[i].title}</td>
            <td>${data.tasks[i].category}</td>
            <td>${data.tasks[i].status}</td>
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

// step 3 - create the handleDelete function
export const handleDelete = async (id) => {
  try {
    enableInput(false);

    // delete task using DELETE method
    const response = await fetch(`/api/v1/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // if delete is successful do this
    if (response.status === 200) {
      message.textContent = "The task has been deleted.";
      await showTasks();
    } else {
      message.textContent = data.msg;
    }
    // if delete is not successful do this
  } catch (err) {
    console.log(err);
    message.textContent = "Failed to delete task.";
  }
  enableInput(true);
};
