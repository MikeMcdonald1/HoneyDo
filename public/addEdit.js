import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showTasks } from "./tasks.js";

let addEditDiv = null;
let title = null;
let status = null;
let recurrence = null;
let addingTask = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-task");
  title = document.getElementById("title");
  status = document.getElementById("status");
  recurrence = document.getElementById("recurrence");
  addingTask = document.getElementById("adding-task");
  const editCancel = document.getElementById("edit-cancel");

  //   addEditDiv.addEventListener("click", (e) => {
  //     if (inputEnabled && e.target.nodeName === "BUTTON") {
  //       if (e.target === addingTask) {
  //         showTasks();
  //       } else if (e.target === editCancel) {
  //         showTasks();
  //       }
  //     }
  //   });
  // };

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingTask) {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/tasks";
        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: title.value,
              status: status.value,
              recurrence: recurrence.value,
            }),
          });

          const data = await response.json();
          if (response.status === 201) {
            // 201 indicates a successful create
            message.textContent = "The task entry was created.";

            title.value = "";
            status.value = "";
            recurrence.value = "never";

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

export const showAddEdit = (task) => {
  message.textContent = "";
  setDiv(addEditDiv);
};
