let form = document.getElementById("lobby__form");

let displayName = localStorage.getItem("display_name");
if (displayName) {
  form.name.value = displayName;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  localStorage.setItem("display_name", e.target.name.value);

  let inviteCode = e.target.room.value;
  if (!inviteCode) {
    inviteCode = String(Math.floor(Math.random() * 100000));
  }

  window.location = `index.html?room=${inviteCode}`;
});
