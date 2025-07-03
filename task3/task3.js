const menuIcon = document.querySelector("#menu-icon");
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
  }
});

let currentPage = 1;
let totalPages;

// call api fetch user
function fetchUsers(page) {
  fetch(`https://reqres.in/api/users?page=${page}`, {
    method: "GET",
    headers: {
      "x-api-key": "reqres-free-v1",
    },
  })
    .then((res) => res.json())
    .then((data) => {
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

// paginate
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

if (currentPage === 1) {
  prevPageBtn.setAttribute("disabled", true);
  prevPageBtn.style.opacity = 0.4;
} else if (currentPage === totalPages) {
  nextPageBtn.setAttribute("disabled", true);
  nextPageBtn.style.opacity = 0.4;
} else {
  nextPageBtn.style.opacity = 1;
  prevPageBtn.style.opacity = 1;
}
