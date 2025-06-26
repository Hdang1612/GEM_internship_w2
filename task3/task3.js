const menuIcon = document.querySelector(".menu-icon");
const menuContainer = document.querySelector(".menu-container");
const closeMenuBtn = document.querySelector(".menu-container__close-btn");
const nextPageBtn = document.querySelector(".next-btn");
const prevPageBtn = document.querySelector(".prev-btn");
menuIcon.addEventListener("click", function () {
  console.log("first");
  if (menuContainer.classList.contains("active")) {
    menuContainer.classList.remove("active");
  } else {
    menuContainer.classList.add("active");
  }
});
closeMenuBtn.addEventListener("click", function () {
  if (menuContainer.classList.contains("active")) {
    menuContainer.classList.remove("active");
  } else {
    menuContainer.classList.add("active");
  }
});

window.addEventListener("click", function (event) {
  if (
    !menuContainer.contains(event.target) &&
    !menuIcon.contains(event.target)
  ) {
    menuContainer.classList.remove("active");
    // document.getElementsByTagName("body")[0].style.overflow = "auto";
  }
});

let currentPage = 1;
let totalPages;

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
      totalPages = data.total_pages;
      let paginationHTML = "";
      const pages = paginate(currentPage, totalPages);
      console.log(pages);
      pages.forEach((item) => {
        if (item === "...") {
          paginationHTML += `<span style="margin:0 10px" >...</span>`;
        } else {
          paginationHTML += `<button class="pagination__item${
            item == currentPage ? " pagination__item--active" : ""
          }">${item}</button>`;
        }
      });
      pagination.innerHTML = paginationHTML;
    });
}
function paginate(current, last) {
  const delta = 1;
  const left = current - delta;
  const right = current + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}
fetchUsers(1);
document
  .querySelector(".pagination__pages")
  .addEventListener("click", function (e) {
    const btn = e.target;
    if (btn) {
      const page = btn.textContent.trim();
      if (page) fetchUsers(Number(page));
      currentPage = Number(page);
    }
  });

nextPageBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchUsers(currentPage);
  }
});
prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchUsers(currentPage);
  }
});
