// Kartu Cuaca Start
let success = async position => {
  let dataWeather = await fetch(
    `https://api.ambeedata.com/weather/forecast/by-lat-lng?lat=${position.coords.latitude}&lng=${position.coords.longitude}&filter=hourly`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-api-key":
          "b4cedef380d6627d327f2ad174a2ef05e403ed2170712d7ecdfdacc084dd19f6"
        // punya Mulia : 9dfdbe26a37470b7c04444549cc7b020b99230a85a9e3f8a9d41da6b4a82065a
        // punya dimas : b4cedef380d6627d327f2ad174a2ef05e403ed2170712d7ecdfdacc084dd19f6
        // punya yusril : b7e8ef6541ab5e5a8ad95a4abfb08dd4788c80716fecc6da0c9e9f73fd3f17f1
      }
    }
  ).then(response => response.json());

  let setWeather = (element, index) => {
    let weather = element.querySelector("#weather");
    let summary = element.querySelector("#summary");
    let time = element.querySelector("#time");

    let statusWeather = dataWeather["data"]["forecast"][index]["icon"];
    console.log(statusWeather);
    if (/clear/.test(statusWeather) && /day/.test(statusWeather)) {
      weather.setAttribute("class", "fas fa-sun fa-4x icon");
    } else if (/clear/.test(statusWeather) && /night/.test(statusWeather)) {
      weather.setAttribute("class", "fas fa-moon fa-4x icon");
    } else if (/cloud/.test(statusWeather) && /day/.test(statusWeather)) {
      weather.setAttribute("class", "	fas fa-cloud-sun fa-4x icon");
    } else if (/cloud/.test(statusWeather) && /night/.test(statusWeather)) {
      weather.setAttribute("class", "fas fa-cloud-moon fa-4x icon");
    } else if (/rain/.test(statusWeather) && /day/.test(statusWeather)) {
      weather.setAttribute("class", "fas fa-cloud-sun-rain fa-4x icon");
    } else if (/rain/.test(statusWeather) && /night/.test(statusWeather)) {
      weather.setAttribute("class", "fas fa-cloud-moon-rain icon");
    } else if (/rain/.test(statusWeather)) {
      weather.setAttribute("class", "fas fa-cloud-showers-heavy fa-4x icon");
    }

    summary.innerHTML = dataWeather["data"]["forecast"][index]["summary"];

    let timeEpoch = new Date(0);
    timeEpoch.setUTCSeconds(dataWeather["data"]["forecast"][index]["time"]);
    time.innerHTML =
      timeEpoch.getHours() +
      "." +
      (timeEpoch.getMinutes() < 10 ? "0" : "") +
      timeEpoch.getMinutes();
  };

  let kartuCuaca = document.querySelectorAll("#weather-cards > *");
  for (let i = 0; i < kartuCuaca.length; i++) {
    setWeather(kartuCuaca[i], i + 1);
  }
};

let fail = error => {
  console.log(error);
};

window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, fail);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};
// Kartu Cuaca End

// Kartu To-Do-List Start
const list = document.getElementById("list");
let counter = 0;
let dataTodo = [
  {
    data: {}
  }
];

let refreshDataLocal = () => {
  localStorage.setItem("dataToDo", JSON.stringify(dataTodo));
};

let createToDo = (name, position, isCheck = false) => {
  let objToDo = {
    name,
    isCheck
  };

  const li = document.createElement("li");
  li.style.display = "flex";
  li.style.alignItems = "center";
  li.style.margin = "10px 0";
  li.counter = position;

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
      imgCircle.setAttribute("class", "far fa-circle fa-lg");
      imgCircle.style.color = "black";
      objToDo["isCheck"] = !objToDo["isCheck"];
      label.style.textDecoration = "none";
    }
  };
  imgCircleCheck();
  imgCircle.style.cursor = "pointer";
  imgCircle.onclick = () => {
    imgCircleCheck();
    dataTodo[0]["data"][li.counter]["isCheck"] = objToDo["isCheck"];
    refreshDataLocal();
  };

  const imgTrash = document.createElement("i");
  imgTrash.setAttribute("class", "fas fa-trash-alt fa-lg");
  imgTrash.style.cursor = "pointer";
  imgTrash.onmouseover = () => {
    imgTrash.style.color = "red";
  };
  imgTrash.onmouseleave = () => {
    imgTrash.style.color = "black";
  };
  imgTrash.onclick = () => {
    delete dataTodo[0]["data"][li.counter];
    li.remove();
    refreshDataLocal();
  };

  li.appendChild(imgCircle);
  li.appendChild(label);
  li.appendChild(imgTrash);

  list.appendChild(li);
  return objToDo;
};

if (localStorage.getItem("dataToDo") != null) {
  let dataTemp = JSON.parse(localStorage.getItem("dataToDo"));
  for (let item in dataTemp[0]["data"]) {
    dataTodo[0]["data"][counter] = createToDo(
      dataTemp[0]["data"][item]["name"],
      counter,
      !dataTemp[0]["data"][item]["isCheck"]
    );
    counter++;
  }
}

document.getElementById("text-todo").onkeyup = event => {
  if (event.code === "Enter") {
    document.getElementById("add-todo").click();
  }
};

document.getElementById("add-todo").onclick = () => {
  let textToDo = document.getElementById("text-todo").value;
  if ((!/\s/.test(textToDo) || /\w+/.test(textToDo)) && "" != textToDo) {
    let toDo = createToDo(textToDo, counter);
    dataTodo[0]["data"][counter] = toDo;
    counter++;
    refreshDataLocal();
  }
  document.getElementById("text-todo").value = "";
};

document.getElementById("reset-todo").onclick = () => {
  while (list.firstChild) {
    list.firstChild.remove();
  }
  dataTodo = [
    {
      data: {}
    }
  ];
  localStorage.clear();
  counter = 0;
  console.log("Reset Success");
};
// Kartu To-Do-List End
