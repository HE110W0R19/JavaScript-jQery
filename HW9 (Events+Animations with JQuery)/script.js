function ToDark(elem, prop) {
  $(elem).css("backgroundColor", getComputedStyle($(".dark-theme-icon")[0]).
    getPropertyValue(prop));
}

function ToWhite(elem, prop) {
  $(elem).css("backgroundColor", getComputedStyle($(".white-theme-icon")[0]).
    getPropertyValue(prop));
}

function Open_GetPos(elem) {
  $(elem).css("display", "block");
  $(elem).css("left", getComputedStyle(document.documentElement).
    getPropertyValue("--x_mouse_cord") + "px");
  $(elem).css("top", getComputedStyle(document.documentElement).
    getPropertyValue("--y_mouse_cord") + "px");
}

$(".menu-button").hover(
  function() {
    //$(".sidebar").css("left", `${0}px`);
    $(".sidebar").animate({ left: "0" }, 150,
      function() {
        $(".sidebar-button").animate({ opacity: "1" }, 999)
      })
  });

$(".close-button").click(
  function() {
    $(".context-menu-sidebar").css("display", "none");
    //$(".sidebar").css("left", `${-350}px`);
    $(".sidebar-button").animate({ opacity: "0.0" }, 123,
      function() {
        $(".sidebar").animate({ left: "-350" }, 10)
      })
  });

$(".white-theme-icon").click(
  function() {
    $(".dark-theme-icon").css("display", "inline-block");
    $(".white-theme-icon").css("display", "none");
    ToWhite("header", "--background-header");
    ToWhite(".sidebar", "--background-sidebar");
    ToWhite("html", "--backround-page")
    ToWhite(".context-menu-sidebar", "--background-header");
  });

$(".dark-theme-icon").click(
  function() {
    $(".white-theme-icon").css("display", "inline-block");
    $(".dark-theme-icon").css("display", "none");
    ToDark("header", "--background-header");
    ToDark(".sidebar", "--background-sidebar");
    ToDark("html", "--backround-page");
    ToDark(".context-menu-sidebar", "--background-header");
  });

$(document)[0].addEventListener('mousemove', e => {
  $(document.documentElement)[0].style.setProperty('--x_mouse_cord', e.x);
  $(document.documentElement)[0].style.setProperty('--y_mouse_cord', e.y);
}, { passive: true });

var sidebar_bool = 0;
var body_bool = 0;

function closer(obj, close_it) {
  $(obj).click(function() {
    $(close_it).css("display", "none");
    sidebar_bool = 0;
    body_bool = 0;
  })
}

$(".sidebar").contextmenu(e => {
  e.preventDefault()
  if (body_bool == 0) {
    Open_GetPos(".context-menu-sidebar");
    sidebar_bool = 1;
    closer("#sidebar_close", ".context-menu-sidebar");
    e.preventDefault()
  }
});

$("html").contextmenu(e => {
  e.preventDefault()
  if (sidebar_bool == 0) {
    Open_GetPos(".context-menu-body");
    body_bool = 1;
    closer("#body_close", ".context-menu-body");
    e.preventDefault()
  }
});




