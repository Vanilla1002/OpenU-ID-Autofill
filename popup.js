const idForm = document.getElementById("idForm");
const credForm = document.getElementById("credForm");
const saveIdBtn = document.getElementById("saveIdBtn");
const saveCredsBtn = document.getElementById("saveCredsBtn");
const flipBtn = document.getElementById("flipBtn");
const statusEl = document.getElementById("status");

function showStatus(msg) {
  statusEl.textContent = msg;
  
}

function toggleView() {
  const showingId = !idForm.classList.contains("hidden");

  if (showingId) {
    idForm.classList.add("hidden");
    credForm.classList.remove("hidden");
    credForm.insertBefore(flipBtn, saveCredsBtn);
    flipBtn.textContent = "Use Student ID";
  } else {
    credForm.classList.add("hidden");
    idForm.classList.remove("hidden");
    idForm.insertBefore(flipBtn, saveIdBtn);
    flipBtn.textContent = "Use Account/Password";
  }
}

idForm.insertBefore(flipBtn, saveIdBtn);
flipBtn.addEventListener("click", toggleView);

saveIdBtn.addEventListener("click", () => {
  const id = document.getElementById("studentId").value.trim();
  if (!/^[0-9]{9}$/.test(id)) {
    statusEl.textContent = "Enter a valid 9‑digit ID.";
    return;
  }

  chrome.storage.sync.set({ ouId: id }, () => {
    chrome.storage.sync.remove("lastSubmitTs", () => {
      showStatus("ID Saved!");
    });
  });
});

document.getElementById("studentId").addEventListener("keydown", (e) => {
  if (e.key === "Enter") saveIdBtn.click();
});

saveCredsBtn.addEventListener("click", () => {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value;
  if (!user || !pass) {
    statusEl.textContent = "Both fields are required.";
    return;
  }

  chrome.storage.sync.set({ ouUser: user, ouPass: pass }, () => {
    chrome.storage.sync.remove("lastSubmitTs", () => {
      showStatus("Credentials Saved!");
    });
  });
});

document.getElementById("password").addEventListener("keydown", (e) => {
  if (e.key === "Enter") saveCredsBtn.click();
});
