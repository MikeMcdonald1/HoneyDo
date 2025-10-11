let activeDiv = null;
export const setDiv = (newDiv) => {
  if (newDiv != activeDiv) {
    if (activeDiv) {
      activeDiv.style.display = "none";
    }
    newDiv.style.display = "block";
    activeDiv = newDiv;
  }
};

export let inputEnabled = true;
export const enableInput = (state) => {
  inputEnabled = state;
};

export let token = null;
export const setToken = (value) => {
  token = value;
  if (value) {
    localStorage.setItem("token", value);
  } else {
    localStorage.removeItem("token");
  }
};

export let message = null;

const HOUSEHOLD_STORAGE_KEY = "householdInfo";
let householdInfo = null;
let householdNameElement = null;
let householdCodeElement = null;

const updateHouseholdDisplay = () => {
  if (!householdNameElement || !householdCodeElement) {
    return;
  }

  if (householdInfo && householdInfo.name) {
    householdNameElement.textContent = householdInfo.name;
  } else {
    householdNameElement.textContent = "—";
  }

  if (householdInfo && householdInfo.joinCode) {
    householdCodeElement.textContent = householdInfo.joinCode;
  } else {
    householdCodeElement.textContent = "—";
  }
};

export const setHouseholdInfo = (value) => {
  householdInfo = value;

  if (value) {
    localStorage.setItem(HOUSEHOLD_STORAGE_KEY, JSON.stringify(value));
  } else {
    localStorage.removeItem(HOUSEHOLD_STORAGE_KEY);
  }

  updateHouseholdDisplay();
};

import { showTasks, handleTasks } from "./tasks.js";
import { showLoginRegister, handleLoginRegister } from "./loginRegister.js";
import { handleLogin } from "./login.js";
import { handleAddEdit } from "./addEdit.js";
import { handleRegister } from "./register.js";

document.addEventListener("DOMContentLoaded", () => {
  token = localStorage.getItem("token");
  message = document.getElementById("message");
  householdNameElement = document.getElementById("household-name");
  householdCodeElement = document.getElementById("household-code");

  const storedHousehold = localStorage.getItem(HOUSEHOLD_STORAGE_KEY);
  if (storedHousehold) {
    try {
      householdInfo = JSON.parse(storedHousehold);
    } catch (error) {
      householdInfo = null;
      localStorage.removeItem(HOUSEHOLD_STORAGE_KEY);
    }
  }
  updateHouseholdDisplay();
  handleLoginRegister();
  handleLogin();
  handleTasks();
  handleRegister();
  handleAddEdit();
  if (token) {
    showTasks();
  } else {
    showLoginRegister();
  }
});
