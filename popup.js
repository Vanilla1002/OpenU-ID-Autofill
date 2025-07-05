const idForm = document.getElementById("idForm");
const credForm = document.getElementById("credForm");
const saveIdBtn = document.getElementById("saveIdBtn");
const saveCredsBtn = document.getElementById("saveCredsBtn");
const deleteIdBtn = document.getElementById("deleteIdBtn");
const deleteCredsBtn = document.getElementById("deleteCredsBtn");
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
    credForm.insertBefore(flipBtn, deleteCredsBtn);
    flipBtn.textContent = "Use Student ID";
  } else {
    credForm.classList.add("hidden");
    idForm.classList.remove("hidden");
    idForm.insertBefore(flipBtn, deleteIdBtn);
    flipBtn.textContent = "Use Account/Password";
  }
}

idForm.insertBefore(flipBtn, deleteIdBtn);
flipBtn.addEventListener("click", toggleView);

// Check if data exists to enable delete buttons
chrome.storage.sync.get(["ouId", "ouUser", "ouPass"], (result) => {
  if (result.ouId) deleteIdBtn.disabled = false;
  if (result.ouUser || result.ouPass) deleteCredsBtn.disabled = false;
});

saveIdBtn.addEventListener("click", () => {
  const id = document.getElementById("studentId").value.trim();
  if (!/^[0-9]{9}$/.test(id)) {
    showStatus("Enter a valid 9-digit ID.");
    return;
  }

  chrome.storage.sync.set({ ouId: id }, () => {
    chrome.storage.sync.remove("lastSubmitTs", () => {
      showStatus("ID Saved!");
      deleteIdBtn.disabled = false;
    });
  });
});

deleteIdBtn.addEventListener("click", () => {
  chrome.storage.sync.remove("ouId", () => {
    document.getElementById("studentId").value = "";
    deleteIdBtn.disabled = true;
    showStatus("ID Deleted.");
  });
});

document.getElementById("studentId").addEventListener("keydown", (e) => {
  if (e.key === "Enter") saveIdBtn.click();
});

saveCredsBtn.addEventListener("click", () => {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value;

  if (!user || !pass) {
    showStatus("Both fields are required.");
    return;
  }

  chrome.storage.sync.set({ ouUser: user, ouPass: pass }, () => {
    chrome.storage.sync.remove("lastSubmitTs", () => {
      showStatus("Credentials Saved!");
      deleteCredsBtn.disabled = false;
    });
  });
});

deleteCredsBtn.addEventListener("click", () => {
  chrome.storage.sync.remove(["ouUser", "ouPass"], () => {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    deleteCredsBtn.disabled = true;
    showStatus("Credentials Deleted.");
  });
});

document.getElementById("password").addEventListener("keydown", (e) => {
  if (e.key === "Enter") saveCredsBtn.click();
});
