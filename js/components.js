function loadHeader() {
  const headerContainer = document.getElementById("header");

  fetch("../components/header.html")
    .then(res => res.text())
    .then(data => {
      headerContainer.innerHTML = data;

      requestAnimationFrame(() => {
        headerContainer.classList.remove("header-loading");
        headerContainer.classList.add("header-loaded");

        initHeader(); // IMPORTANT: run AFTER header inserted
      });
    });
}


function initHeader() {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const themeBtn = document.getElementById("theme-toggle");
  const rtlBtn = document.getElementById("rtl-toggle");

  
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("active")) {
      icon.classList.replace("fa-bars", "fa-xmark");
    } else {
      icon.classList.replace("fa-xmark", "fa-bars");
    }
  });

  
  setActiveLink();

  
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const dark = document.body.classList.contains("dark-mode");

    localStorage.setItem("theme", dark ? "dark" : "light");

    themeBtn.innerHTML = dark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  });

  
  if (localStorage.getItem("rtl") === "true") {
    document.body.classList.add("rtl");
  }

  rtlBtn.addEventListener("click", () => {
    document.body.classList.toggle("rtl");

    localStorage.setItem(
      "rtl",
      document.body.classList.contains("rtl")
    );
  });

  
  document.querySelectorAll(".dropdown > a").forEach(link => {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        this.parentElement.classList.toggle("open");

        const menu = this.nextElementSibling;
        menu.classList.toggle("show");
      }
    });
  });
}


function setActiveLink() {
  const links = document.querySelectorAll(".nav-links a");
  const current = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
}


document.addEventListener("DOMContentLoaded", loadHeader);


function initFooter() {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach(section => {
    const heading = section.querySelector(".footerHeading");

    heading.addEventListener("click", () => {
      if (window.innerWidth < 640) {
        section.classList.toggle("active");
      }
    });
  });
}

function loadFooter(){
  fetch("../components/footer.html")
  .then(res=>res.text())
  .then(data=>{
    document.getElementById("footer").innerHTML=data;
  })
  .catch(err=>console.log("Footer load error:",err));
}

document.addEventListener("DOMContentLoaded",loadFooter);