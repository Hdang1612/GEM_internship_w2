//
function toggleButton() {
  const button_1 = document.querySelector("#button-toggle");
  if (button_1.innerHTML === "Click") {
    button_1.innerHTML = "Clicked!";
  } else {
    button_1.innerHTML = "Click";
  }
}

function addField() {
  const text = document.getElementById("text").value;
  document.getElementById("text-field").innerHTML = text;
  document.getElementById("text").value = "";
}

const regex = /^\s*-?\d+(\.\d+)?\s*$/;
const inputTask2_3 = document.getElementById("text_2");
const message = document.getElementById("message");
inputTask2_3.addEventListener("input", () => {
  const text2 = inputTask2_3.value;
  if (regex.test(text2)) {
    message.style.display = "none";
  } else {
    message.style.display = "block";
  }
});
