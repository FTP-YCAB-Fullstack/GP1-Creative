let createDiv = () => {
  const div = document.createElement("div");
  div.setAttribute("class", "bubble");
  let ukuran = Math.round(Math.random() * 100) + "px";
  div.style.left = Math.round(Math.random() * 100) + "%";
  div.style.animationDuration = Math.ceil(Math.random() * 10) + "s";
  div.style.animationDelay = Math.ceil(Math.random() * 10) + "s";
  div.style.width = ukuran;
  div.style.height = ukuran;

  return div;
};

let container = document.getElementById("container-bubble");
for (let i = 0; i <= 30; i++) {
  container.appendChild(createDiv());
}
