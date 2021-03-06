var loader = (function(){
  var verbose = false; // CONSOLE
  var manager;
  var has_loaded = false;
  var has_entered = false;
  var dom;
  var logo;
  var bar;
  var control;
  // Manager Handlers
  var on_start = function (item, loaded, total) {
    if (verbose) console.log('LOADER: Loading started');
    // correct mobile device window position
    window.scrollTo(0, 0);
  };
  var on_load = function () {
    if (verbose) console.log('LOADER: Loading complete');
    bar.animateOnce('fadeOut');
    has_loaded = true;
    on_enter();
  };
  var on_progress = function (item, loaded, total) {
    control.set((loaded*100.0)/total*1.0);
    // correct mobile device window position
    window.scrollTo(0, 0);
  };
  var on_error = function (url) {
    if (verbose) console.log('LOADER: Error loading');
  };
  var on_enter = function () {
    if (has_loaded && !has_entered)
    {
      dom.animateOnce('fadeOut');
      // ++ TODO: REMOVE THIS DEPENDENCIES!!!:
      $("body").removeClass("modal-open");
      // correct mobile device window position
      window.scrollTo(0, 0);
      // three.trigger_anim(1,0.5);
      // +++
      has_entered = true;
    }
  };
  // PUBLIC
  var init = function () {
    if (verbose) console.log("INIT: loader");
    logo = $('#logo');
    bar = $('#loadBar');
    dom = $('#loadScreen');
    control = document.getElementById('loadBar').ldBar;
    manager = new THREE.LoadingManager();
    manager.onStart = on_start;
    manager.onLoad = on_load;
    manager.onProgress = on_progress;
    manager.onError = on_error;
    $("body").addClass("modal-open");
  };
  var get_manager = function () {
    return manager;
  };
  var get_entered = function () {
    return has_entered;
  };
  return {
    get_manager : get_manager,
    get_entered : get_entered,
    init : init
  };
})();
