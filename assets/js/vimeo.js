
var vimeo = (function(){
  var verbose = false; // CONSOLE
  var WIDTHS = [128,256,384,512,640,768,896,1024];
  var iframe;
  var player;
  var id;
  var color;
  var _on_loaded = function (data) {
    if (verbose) console.log('VIMEO: Video loaded');
  };
  var _on_play = function (data) {
    if (verbose) console.log('VIMEO: Video played');
  };
  var _on_timeupdate = function (data) {
    var percent = data.percent;
    if (verbose) console.log('VIMEO: Video progress:', percent);
  };
  var _on_pause = function (data) {
    if (verbose) console.log('VIMEO: Video paused');
  };
  var _on_ended = function (data) {
    if (verbose) console.log('VIMEO: Video ended');
    set(id);
  };
  var init = function () {
    // By div (using DOMs'id):
    player = new Vimeo.Player('vimeo');
    player.on('loaded', _on_loaded);
    player.on('ended', _on_ended);
    player.on('play', _on_play);
    player.on('pause', _on_pause);
    color = player.getColor();
    // //player.on('timeupdate', _on_timeupdate);
    player.getVideoTitle().then(function(title) {
      if (verbose) console.log('VIMEO: Title:', title);
    });
  };
  var pause = function () {
    player.pause();
  };
  var set = function (newId) {
    // TODO: PROMISES! AND CODE FOR OPTIONS :/
    id = newId;
    player.loadVideo(id).then(function(id) {
      // the video successfully loaded
      if (verbose) console.log('VIMEO: loaded ID:', id);
      // TODO: OPTIONS!!:
      player.setColor(color);
      player.getVideoTitle().then(function(title) {
        if (verbose) console.log('VIMEO: Title:', title);
      });
    }).catch(function(error) {
      switch (error.name) {
        case 'TypeError':
        // the id was not a number
        break;
        case 'PasswordError':
        // the video is password-protected and the viewer needs to enter the
        // password first
        break;
        case 'PrivacyError':
        // the video is password-protected or private
        break;
        default:
        // some other error occurred
        break;
      }
    });
  };
  return {
    init : init,
    set : set,
    pause : pause
  };
})();
