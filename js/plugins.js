// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () {};
  var methods = [
    "assert",
    "clear",
    "count",
    "debug",
    "dir",
    "dirxml",
    "error",
    "exception",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "markTimeline",
    "profile",
    "profileEnd",
    "table",
    "time",
    "timeEnd",
    "timeline",
    "timelineEnd",
    "timeStamp",
    "trace",
    "warn",
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
})();

// card
let buy = document.querySelectorAll(".buy");
let remove = document.querySelectorAll(".remove");
buy.forEach((item) => {
  item.addEventListener("click", (e) => {
    let bottom = e.target.parentElement.parentElement.parentElement;
    bottom.classList.add("clicked");
  });
});
remove.forEach((item) => {
  item.addEventListener("click", (e) => {
    let bottom = e.target.parentElement.parentElement.parentElement;
    bottom.classList.remove("clicked");
  });
});

// modal
const modalBtn = document.querySelector(".modal-btn");
const modal = document.querySelector(".modal-overlay");
const closeBtn = document.querySelectorAll(".close-btn");

modalBtn.addEventListener("click", function () {
  modal.classList.add("open-modal");
});

closeBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    modal.classList.remove("open-modal");
  });
});
