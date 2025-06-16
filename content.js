const ID_INPUT_SELECTOR = 'input[name="p_mis_student"]';
const USERNAME_INPUT_SELECTOR = 'input[name="p_user"]';
const PASSWORD_INPUT_SELECTOR = 'input[name="p_sisma"]';

const SUBMIT_SELECTOR = 'input[type="submit"][value="כניסה >"], img#submit1';

function checkAndSubmit() {
  const idEl = document.querySelector(ID_INPUT_SELECTOR);
  const userEl = document.querySelector(USERNAME_INPUT_SELECTOR);
  const passEl = document.querySelector(PASSWORD_INPUT_SELECTOR);
  const submitEl = document.querySelector(SUBMIT_SELECTOR);

  if (
    idEl &&
    idEl.value.trim() &&
    userEl &&
    userEl.value.trim() &&
    passEl &&
    passEl.value.trim() &&
    submitEl
  ) {
    if (submitEl.tagName.toLowerCase() === "img" && submitEl.parentElement) {
      submitEl.parentElement.click();
    } else {
      submitEl.click();
    }
  }
}

// autofill
chrome.storage.sync.get(["ouId"], ({ ouId }) => {
  if (!ouId) return;
  const idInput = document.querySelector(ID_INPUT_SELECTOR);
  if (idInput) {
    idInput.value = ouId;
    checkAndSubmit();
  }
});

// submit when changing
const userInput = document.querySelector(USERNAME_INPUT_SELECTOR);
const passInput = document.querySelector(PASSWORD_INPUT_SELECTOR);
const idInput = document.querySelector(ID_INPUT_SELECTOR);
if (userInput && passInput && idInput) {
  userInput.addEventListener("change", checkAndSubmit);
  passInput.addEventListener("change", checkAndSubmit);
}
