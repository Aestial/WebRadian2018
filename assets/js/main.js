// GLOBAL CONTROL
var debug = false;
// Methods
var init = function () {
  loader.init();
  popup.init();
  vimeo.init();
  three.init();
};
// Window load event: "all" resources
window.addEventListener('load', init, false);
