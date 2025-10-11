import {
  inputEnabled,
  setDiv,
  token,
  message,
  enableInput,
  setToken,
  setHouseholdInfo,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showTasks } from "./tasks.js";

let loginDiv = null;
let email = null;
let password = null;

export const handleLogin = () => {
  loginDiv = document.getElementById("login-div");
  email = document.getElementById("email");
  password = document.getElementById("password");
  const loginButton = document.getElementById("login-button");
  const loginCancel = document.getElementById("login-cancel");

  loginDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === loginButton) {
        enableInput(false);

        try {
          const response = await fetch("/api/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email.value,
              password: password.value,
            }),
          });

          const data = await response.json();
          if (response.status === 200) {
            message.textContent = `Login successful.  Welcome ${data.user.name}`;
            setToken(data.token);
            setHouseholdInfo(data.household ?? null);

            email.value = "";
            password.value = "";

            showTasks();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.error(err);
          message.textContent = "A communications error occurred.";
        }

        enableInput(true);
      } else if (e.target === loginCancel) {
        email.value = "";
        password.value = "";
        showLoginRegister();
      }
    }
  });
};

export const showLogin = () => {
  email.value = null;
  password.value = null;
  setDiv(loginDiv);
};
