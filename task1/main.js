const user = [
  {
    id: 1,
    age: 20,
    name: "Dang",
  },
  {
    id: 1,
    age: 20,
    name: "Dang",
  },
  {
    id: 1,
    age: 20,
    name: "Dang",
  },
  {
    id: 1,
    age: 20,
    name: "Dang",
  },
];
let editIndex;

function renderUserList() {
  const userList = user.map((item, index) => {
    return `<li>
      ${item.name} - ${item.age}
      <button class="edit-btn" onclick="editUser(${index})">Sửa</button>
      <button class="delete-btn" onclick="deleteUser(${index})">Xóa</button>
    </li>`;
  });
  document.querySelector("#list").innerHTML = userList.join("");
}

renderUserList();
function submit() {
  const name = document.querySelector("#name").value;
  const age = document.querySelector("#age").value;
  if (!name || !age) {
    return;
  }
  if (editIndex !== null) {
    user[editIndex].name = name;
    user[editIndex].age = parseInt(age);
    editIndex = null;
  } else {
    const id = user.length + 1;
    const newUser = {
      id,
      age: parseInt(age),
      name,
    };
    user.push(newUser);
  }
  renderUserList();
  document.querySelector("#name").value = "";
  document.querySelector("#age").value = "";
  document.querySelector(".submit-btn").innerHTML = "Thêm";
}

function editUser(index) {
  editIndex = index;
  document.querySelector("#name").value = user[index].name;
  document.querySelector("#age").value = user[index].age;
  document.querySelector(".submit-btn").innerHTML = "Sửa";
}

function deleteUser(index) {
  user.splice(index, 1);
  renderUserList();
}
