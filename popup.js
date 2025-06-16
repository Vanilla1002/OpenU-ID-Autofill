const input = document.getElementById("studentId");
const status1 = document.getElementById("status");
const saveBtn = document.getElementById("saveBtn");

function isValidId(id) {
  return /^[0-9]{9}$/.test(id);
}

saveBtn.addEventListener("click", () => {
  const id = input.value.trim();

  if (!isValidId(id)) {
    status1.textContent = "Enter a valid ID.";
    return;
  }
  chrome.storage.sync.set({ ouId: id }, () => {
    status1.textContent = "Saved!";
    setTimeout(() => ((status1.textContent = ""), window.close()), 2000);
  });
});
