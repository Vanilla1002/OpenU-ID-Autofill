const ID_INPUT_SELECTOR = 'input[name="p_mis_student"]';
const USERNAME_INPUT_SELECTOR = 'input[name="p_user"]';
const PASSWORD_INPUT_SELECTOR = 'input[name="p_sisma"]';
const SUBMIT_SELECTOR = 'input[type="submit"][value="כניסה >"], img#submit1';

const COOLDOWN_MS = 5000;

function checkAndSubmit() {
  const idEl     = document.querySelector(ID_INPUT_SELECTOR);
  const userEl   = document.querySelector(USERNAME_INPUT_SELECTOR);
  const passEl   = document.querySelector(PASSWORD_INPUT_SELECTOR);
  const submitEl = document.querySelector(SUBMIT_SELECTOR);

  const idFilled   = idEl && idEl.value.trim() !== "";
  const userFilled = userEl && userEl.value.trim() !== "";
  const passFilled = passEl && passEl.value.trim() !== "";

  if (idFilled && userFilled && passFilled && submitEl) {
    if (submitEl.tagName.toLowerCase() === "img" && submitEl.parentElement) {
      submitEl.parentElement.click();
    } else {
      submitEl.click();
    }
  }
}


function triggerSubmit() {
  chrome.storage.sync.get("lastSubmitTs", ({ lastSubmitTs }) => {
    const now = Date.now();
    if (lastSubmitTs && now - lastSubmitTs < COOLDOWN_MS) {
      
      return;
    }
    
    chrome.storage.sync.set({ lastSubmitTs: now }, checkAndSubmit);
  });
}

chrome.storage.sync.get(
  ["ouId", "ouUser", "ouPass"],
  ({ ouId, ouUser, ouPass }) => {
    if (ouId) {
      const idInput = document.querySelector(ID_INPUT_SELECTOR);
      if (idInput) idInput.value = ouId;
    }
    if (ouUser) {
      const userInput = document.querySelector(USERNAME_INPUT_SELECTOR);
      if (userInput) userInput.value = ouUser;
    }
    if (ouPass) {
      const passInput = document.querySelector(PASSWORD_INPUT_SELECTOR);
      if (passInput) passInput.value = ouPass;
    }
    
    if (ouId && ouUser && ouPass) {
      triggerSubmit();
    }
  }
);


[ID_INPUT_SELECTOR, USERNAME_INPUT_SELECTOR, PASSWORD_INPUT_SELECTOR].forEach(
  (selector) => {
    const el = document.querySelector(selector);
    if (el) el.addEventListener("change", triggerSubmit);
  }
);
