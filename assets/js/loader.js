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
  };
  var on_load = function () {
    if (verbose) console.log('LOADER: Loading complete');
    logo.animateOnce('tada');
    bar.animateOnce('fadeOut');
    // TODO: REMOVE THIS DEPENDENCY:
    $.fn.fullpage.silentMoveTo('aboutus');
    has_loaded = true;
  };
  var on_progress = function (item, loaded, total) {
    control.set((loaded*100.0)/total*1.0);
  };
  var on_error = function (url) {
    if (verbose) console.log('LOADER: Error loading');
  };
  var on_enter = function () {
    if (has_loaded && !has_entered)
    {
      dom.animateOnce('fadeOut');
      // ++ TODO: REMOVE THIS DEPENDENCIES!!!:
      two.anim();
      three.trigger_anim(1,0.5);
      $.fn.fullpage.setAllowScrolling(true);
      // ++
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
    logo.hover(on_enter);
    manager = new THREE.LoadingManager();
    manager.onStart = on_start;
    manager.onLoad = on_load;
    manager.onProgress = on_progress;
    manager.onError = on_error;
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
