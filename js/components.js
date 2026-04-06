
function loadHeader(){
  fetch("../components/header.html")
  .then(res=>res.text())
  .then(data=>{
    document.getElementById("header").innerHTML=data;
    initHeader();
  });
}


function toggleMenu(){
  const nav=document.getElementById("navLinks");
  const icon=document.querySelector("#menuToggle i");

  nav.classList.toggle("active");

  if(nav.classList.contains("active")){
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  }else{
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
}


function setActiveLink(){
  const links=document.querySelectorAll(".nav-links a");
  const current=window.location.pathname.split("/").pop();

  links.forEach(link=>{
    if(link.getAttribute("href")===current){
      link.classList.add("active");
    }
  });
}


function initHeader(){

  
  const themeBtn=document.getElementById("theme-toggle");

  if(localStorage.getItem("theme")==="dark"){
    document.body.classList.add("dark-mode");
    themeBtn.textContent="☀️";
  }

  themeBtn.addEventListener("click",()=>{
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
      localStorage.setItem("theme","dark");
      themeBtn.textContent="☀️";
    }else{
      localStorage.setItem("theme","light");
      themeBtn.textContent="🌙";
    }
  });

  
  const rtlBtn=document.getElementById("rtl-toggle");

  if(localStorage.getItem("rtl")==="true"){
    document.body.classList.add("rtl");
  }

  rtlBtn.addEventListener("click",()=>{
    document.body.classList.toggle("rtl");

    localStorage.setItem(
      "rtl",
      document.body.classList.contains("rtl")
    );
  });

  setActiveLink();
}


document.addEventListener("click", function(e){

  if(window.innerWidth <= 480){

    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(drop => {

      const link = drop.querySelector("a");

      if(link.contains(e.target)){
        e.preventDefault();

        drop.classList.toggle("open");

        const menu = drop.querySelector(".dropdown-menu");
        menu.classList.toggle("show");
      }

    });

  }

});

document.addEventListener("DOMContentLoaded",loadHeader);


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