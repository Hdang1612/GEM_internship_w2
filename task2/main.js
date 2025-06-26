//create element
const toggleButton = document.createElement("button");
const inputAdd = document.createElement("div");
const textField = document.createElement("div");
const inputValidate = document.createElement("div");
toggleButton.textContent = "Click";
inputAdd.innerHTML = `<label for="text">TEXT1</label>
        <input type="text" id="text" />
        <button onclick="addField()">Thêm</button>
        `;
inputValidate.innerHTML = `<label for="text">TEXT2</label>
        <input type="text" id="text_2" />
        `;

document.body.appendChild(toggleButton);
document.body.appendChild(inputAdd);
document.body.appendChild(textField);
document.body.appendChild(inputValidate);

toggleButton.addEventListener("click", () => {
  if (toggleButton.innerHTML === "Click") {
    toggleButton.innerHTML = "Clicked!";
  } else {
    toggleButton.innerHTML = "Click";
  }
});

function addField() {
  const text = document.getElementById("text").value;
  const newText = document.createElement("p");
  newText.textContent = text;
  textField.appendChild(newText);
  //   document.getElementById("text-field").innerHTML = text;
  document.getElementById("text").value = "";
}

const inputTask2_3 = document.getElementById("text_2");
function preventAlphabet(inputVal) {
  console.log(inputVal);
  const regex = /^[\d.\-\s]+$/;
  if (regex.test(inputVal)) {
    inputTask2_3.value = inputVal;
  } else {
    var txt = inputVal.slice(0, -1);
    inputTask2_3.value = txt;
  }
}

const message = document.getElementById("message");
inputTask2_3.addEventListener("input", function () {
  preventAlphabet(this.value);
});
