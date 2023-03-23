function ToDark(elem, prop) {
  let obj = document.querySelector(elem);
  obj.style.backgroundColor = getComputedStyle(document.querySelector(".dark-theme-icon")).
    getPropertyValue(prop);
}

function ToWhite(elem, prop) {
  let obj = document.querySelector(elem);
  obj.style.backgroundColor = getComputedStyle(document.querySelector(".white-theme-icon")).
    getPropertyValue(prop);
}

function Open_GetPos(elem) {
  let obj = document.querySelector(elem);
  obj.style.display = "block";
  obj.style.left = getComputedStyle(document.documentElement).
    getPropertyValue("--x_mouse_cord") + "px";
  obj.style.top = getComputedStyle(document.documentElement).
    getPropertyValue("--y_mouse_cord") + "px";
}

document.querySelector(".menu-button").addEventListener(
  'mouseover',
  (event) => {
    document.querySelector(".sidebar").style.left = `${0}px`;
  });

document.querySelector(".close-button").addEventListener(
  'click',
  (event) => {
    document.querySelector(".sidebar").style.left = `${-350}px`;
  });

document.querySelector(".white-theme-icon").addEventListener(
  'click',
  (event) => {
    document.querySelector(".dark-theme-icon").style.display = "inline-block";
    document.querySelector(".white-theme-icon").style.display = "none";
    ToWhite("header", "--background-header");
    ToWhite(".sidebar", "--background-sidebar");
    ToWhite("html", "--backround-page")
  });

document.querySelector(".dark-theme-icon").addEventListener(
  'click',
  (event) => {
    document.querySelector(".white-theme-icon").style.display = "inline-block";
    document.querySelector(".dark-theme-icon").style.display = "none";
    ToDark("header", "--background-header");
    ToDark(".sidebar", "--background-sidebar");
    ToDark("html", "--backround-page");
  });

document.addEventListener('mousemove', e => {
  document.documentElement.style.setProperty('--x_mouse_cord', e.x);
  document.documentElement.style.setProperty('--y_mouse_cord', e.y);
}, { passive: true });

function closer(obj, close_it) {
  document.querySelector(obj).addEventListener("click", event => {
    document.querySelector(close_it).style.display = "none";
    sidebar_bool = 0;
    body_bool = 0;
  })
}

var sidebar_bool = 0;
var body_bool = 0;

document.querySelector(".sidebar").addEventListener('contextmenu', e => {
  e.preventDefault()
  if (body_bool == 0) {
    Open_GetPos(".context-menu-sidebar");
    sidebar_bool = 1;
    closer("#sidebar_close", ".context-menu-sidebar");
    e.preventDefault()
  }
});

document.querySelector("html").addEventListener('contextmenu', e => {
  e.preventDefault()
  if (sidebar_bool == 0) {
    Open_GetPos(".context-menu-body");
    body_bool = 1;
    closer("#body_close", ".context-menu-body");
    e.preventDefault()
  }
});




