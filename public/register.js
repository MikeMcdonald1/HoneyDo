import {
  inputEnabled,
  setDiv,
  message,
  token,
  enableInput,
  setToken,
  setHouseholdInfo,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showTasks } from "./tasks.js";

let registerDiv = null;
let name = null;
let email1 = null;
let password1 = null;
let password2 = null;
let joinHouseholdText = null;

export const handleRegister = () => {
  registerDiv = document.getElementById("register-div");
  name = document.getElementById("name");
  email1 = document.getElementById("email1");
  password1 = document.getElementById("password1");
  password2 = document.getElementById("password2");
  joinHouseholdText = document.getElementById("joinHouseholdText");
  const registerButton = document.getElementById("register-button");
  const registerCancel = document.getElementById("register-cancel");

  const radios = document.querySelectorAll("input[name='household']");
  const joinHouseholdTextContainer = document.getElementById(
    "joinHouseholdTextContainer"
  );
  radios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const value = e.target.value;
      if (value === "createHousehold") {
        joinHouseholdTextContainer.hidden = true;
      } else {
        joinHouseholdTextContainer.hidden = false;
      }
    });
  });

  registerDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === registerButton) {
        if (password1.value != password2.value) {
          message.textContent = "The passwords entered do not match.";
        } else {
          enableInput(false);

          try {
            const response = await fetch("/api/v1/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: name.value,
                email: email1.value,
                password: password1.value,
                joinCode: joinHouseholdText.value,
              }),
            });

            const data = await response.json();
            if (response.status === 201) {
              message.textContent = `Registration successful.  Welcome ${data.user.name}`;
              setToken(data.token);
              setHouseholdInfo(data.household);

              name.value = "";
              email1.value = "";
              password1.value = "";
              password2.value = "";
              joinHouseholdText.value = "";

              showTasks();
            } else {
              message.textContent = data.msg;
            }
          } catch (err) {
            console.error(err);
            message.textContent = "A communications error occurred.";
          }

          enableInput(true);
        }
      } else if (e.target === registerCancel) {
        name.value = "";
        email1.value = "";
        password1.value = "";
        password2.value = "";
        joinHouseholdText.value = "";
        showLoginRegister();
      }
    }
  });
};

export const showRegister = () => {
  email1.value = null;
  password1.value = null;
  password2.value = null;
  joinHouseholdText.value = null;
  setDiv(registerDiv);
};
