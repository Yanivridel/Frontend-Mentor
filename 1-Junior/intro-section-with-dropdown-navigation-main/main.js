const menuBar = document.querySelector('.menu-bar');
const navMenu = document.getElementById('nav-menu');
const closeMenuBar = document.querySelector('.close-menu-icon');
const navItems = document.querySelectorAll(".nav-item");
const relativeLists = document.querySelectorAll(".relative");
const overlay = document.getElementById("overlay");

menuBar.addEventListener('click', () => {
    navMenu.classList.add('show');
    overlay.classList.add("active");
});
closeMenuBar.addEventListener('click', () => {
    navMenu.classList.remove('show');
    overlay.classList.remove("active");
});

for(const relList of relativeLists){
    relList.addEventListener("mouseover", (e) => unCollapseList(e));
    relList.addEventListener("mouseout", (e) => collapseList(e));
    relList.addEventListener("click", (e) => unCollapseList(e));
}
function unCollapseList(e) {
    const rel = e.target.closest(".relative");
    if(!rel) return;
    const list = rel.querySelector(".expanded-list");
    const arrow = rel.querySelector(".arrow-img");
    list.classList.add("open");
    arrow.style.backgroundImage = "url('./images/icon-arrow-up.svg')";
}
function collapseList(e) {
    const rel = e.target.closest(".relative");
    if(!rel) return;
    const list = rel.querySelector(".expanded-list");
    const arrow = rel.querySelector(".arrow-img");
    list.classList.remove("open");
    arrow.style.backgroundImage = "url('./images/icon-arrow-down.svg')";
}

function removeOverlay() {
    overlay.classList.remove('active');
    navMenu.classList.remove('show');
}
// removes dark overlay upon resize to desktop
function checkScreenSize() {
    if (window.innerWidth > 1024) {
        removeOverlay();
    }
}
window.addEventListener('resize', checkScreenSize);
overlay.addEventListener("click", removeOverlay);

