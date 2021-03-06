var popup = (function(){
  var verbose = true; // CONSOLE
  var STATES = Object.freeze({Start:-1, Show:0, Hide:1});
  var ANIM_CMD = ['fadeInRight','fadeOutRight'];
  var BTN_TEXT = ['Cerrar','Ver más'];
  var dom;
  var button;
  var state;
  var playing;
  var shown = false;
  // Private methods
  var _play_anim = function (state) {
    var command = ANIM_CMD[state];
    dom.animateOnce(command);
  };
  var _set_text = function () {
    var text = BTN_TEXT[state];
    button.text(text);
  };
  var _update = function (state) {
    _play_anim(state);
    _set_text(state);
    if (state == STATES.Show) {
      $("body").addClass("modal-open");
      shown = true;
    }
    else if (state == STATES.Hide) {
      $("body").removeClass("modal-open");
      if (shown) vimeo.pause();
    }
    window.scrollTo(0, 0);
  };
  // Public methods
  var init = function () {
    if (verbose) console.log("INIT: popup");
    dom = $('#popup');
    button = $('.popup_toggle');
    set(STATES.Hide);
  };
  var set = function (newState) {
    if (newState != state) {
      state = newState;
      if (verbose) console.log("POPUP: Toggling to: " + state);
      _update(state);
    }
  };
  var toggle = function () {
    if (!playing) {
      newState = (state + 1) % 2;
      set(newState);
      return !newState;
      // correct mobile device window position
    }
  };
  var play = function () {
    playing = true;
  };
  var stop = function () {
    playing = false;
  };
  return {
    init : init,
    set : set,
    toggle : toggle,
    play : play,
    stop : stop,
    states : STATES
  };
})();
