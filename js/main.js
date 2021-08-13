const list = document.getElementById("list");
let counter = 0;
let dataTodo = [];

let refreshDataLocal = () => {
  localStorage.setItem("dataToDo", JSON.stringify(dataTodo));
};

let createToDo = (name, isCheck = false) => {
  let objToDo = {
    name,
    isCheck
  };

  const li = document.createElement("li");
  li.style.display = "flex";
  li.style.alignItems = "center";
  li.counter = counter;

  const label = document.createElement("label");
  label.innerHTML = name;
  label.style.fontSize = "1.33em";
  label.style.flexGrow = "1";
  label.style.padding = "0 10px";

  const imgCircle = document.createElement("i");
  let imgCircleCheck = () => {
    if (objToDo["isCheck"]) {
      imgCircle.setAttribute("class", "fa fa-check-circle fa-lg");
      imgCircle.style.color = "green";
      objToDo["isCheck"] = !objToDo["isCheck"];
      label.style.textDecoration = "line-through";
    } else {
      imgCircle.setAttribute("class", "fa fa-circle-thin fa-lg");
      imgCircle.style.color = "black";
      objToDo["isCheck"] = !objToDo["isCheck"];
      label.style.textDecoration = "none";
    }
  };
  imgCircleCheck();
  imgCircle.style.cursor = "pointer";
  imgCircle.onclick = event => {
    imgCircleCheck();
    dataTodo[li.counter]["isCheck"] = objToDo["isCheck"];
    refreshDataLocal();
  };

  const imgTrash = document.createElement("i");
  imgTrash.setAttribute("class", "fa fa-trash-o fa-lg");
  imgTrash.style.cursor = "pointer";
  imgTrash.onmouseover = event => {
    imgTrash.style.color = "red";
  };
  imgTrash.onmouseleave = event => {
    imgTrash.style.color = "black";
  };
  imgTrash.onclick = event => {
    li.remove();
    dataTodo = dataTodo.filter((value, index, arr) => {
      return index != li.counter;
    });
    refreshDataLocal();
  };

  li.appendChild(imgCircle);
  li.appendChild(label);
  li.appendChild(imgTrash);

  list.appendChild(li);
  counter++;
  return objToDo;
};

if (localStorage.getItem("dataToDo") != null) {
  dataTodo = JSON.parse(localStorage.getItem("dataToDo"));
  for (let item of dataTodo) {
    createToDo(item["name"], !item["isCheck"]);
  }
}

document.getElementById("addBtn").onclick = event => {
  let textToDo = document.getElementById("textToDo").value;
  let toDo = createToDo(textToDo);
  dataTodo.push(toDo);
  refreshDataLocal();
};

document.getElementById("resetBtn").onclick = event => {
  while (list.firstChild) {
    list.firstChild.remove();
  }
  dataTodo = [];
  localStorage.clear();
};

