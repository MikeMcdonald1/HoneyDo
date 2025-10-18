import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showTasks } from "./tasks.js";

let addEditDiv = null;
let title = null;
let category = null;
let status = null;
let addingTask = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-task");
  title = document.getElementById("title");
  category = document.getElementById("category");
  status = document.getElementById("status");
  addingTask = document.getElementById("adding-task");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingTask) {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/tasks";

        if (addingTask.textContent === "update") {
          method = "PATCH";
          url = `/api/v1/tasks/${addEditDiv.dataset.id}`;
        }

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: title.value,
              category: category.value,
              status: status.value,
            }),
          });

          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
              // a 200 is expected for a successful update
              message.textContent = "The task entry was updated.";
            } else {
              // a 201 is expected for a successful create
              message.textContent = "The task entry was created.";
            }

            title.value = "";
            category.value = "";
            status.value = "";
            showTasks();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }
        enableInput(true);
      } else if (e.target === editCancel) {
        message.textContent = "";
        showTasks();
      }
    }
  });
};

export const showAddEdit = async (taskId) => {
  if (!taskId) {
    title.value = "";
    category.value = "";
    status.value = "";
    addingTask.textContent = "Add";
    message.textContent = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/tasks/${taskId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        title.value = data.task.title;
        category.value = data.task.category;
        status.value = data.task.status;
        addingTask.textContent = "Update";
        message.textContent = "";
        addEditDiv.dataset.id = taskId;

        setDiv(addEditDiv);
      } else {
        message.textContent = "The tasks entry was not found";
        showTasks();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showTasks();
    }

    enableInput(true);
  }
};
