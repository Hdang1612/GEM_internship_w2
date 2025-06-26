const menu_icon = document.querySelector(".menu-icon");
const menu_container = document.querySelector(".menu-container");
const close_menu_btn = document.querySelector(".menu-container__close-btn");
menu_icon.addEventListener("click", function () {
  console.log("first");
  if (menu_container.classList.contains("active")) {
    menu_container.classList.remove("active");
  } else {
    menu_container.classList.add("active");
  }
});
close_menu_btn.addEventListener("click", function () {
  if (menu_container.classList.contains("active")) {
    menu_container.classList.remove("active");
  } else {
    menu_container.classList.add("active");
  }
});

window.addEventListener("click", function (event) {
  if (
    !menu_container.contains(event.target) &&
    !menu_icon.contains(event.target)
  ) {
    menu_container.classList.remove("active");
    // document.getElementsByTagName("body")[0].style.overflow = "auto";
  }
});

function fetchUsers(page) {
  fetch(`https://reqres.in/api/users?page=${page}`, {
    method: "GET",
    headers: {
      "x-api-key": "reqres-free-v1",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const list = document.querySelector(".content__users-list");
      const pagination = document.querySelector(".pagination__pages");
      list.innerHTML = data.data
        .map(
          (user) => `
        <div class="user-item">
          <div class="user-item__avatar">
            <img src="https://i.pravatar.cc/100?u=${user.avatar}" alt="avatar" />
          </div>
          <div class="user-item__info">
            <div id="name">${user.first_name} ${user.last_name}</div>
            <div id="email">${user.email}</div>
          </div>
        </div>
      `
        )
        .join("");
      const totalPages = data.total_pages;
      let paginationHTML = "";
      for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="pagination__item${
          i == page ? " pagination__item--active" : ""
        }" >${i}</button>`;
      }
      pagination.innerHTML = paginationHTML;
    });
}
fetchUsers(1);
document
  .querySelector(".pagination__pages")
  .addEventListener("click", function (e) {
    const btn = e.target;
    if (btn) {
      const page = btn.textContent.trim();
      if (page) fetchUsers(Number(page));
    }
  });

