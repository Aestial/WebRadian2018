(function() {
	var verbose = false; // CONSOLE
	// ENUM
	var TYPE = Object.freeze({Entrance:1, Exit:2, Fixed:3});
	var end_str = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	var _check_type = function(name) {
		if (name.includes("In")){
			return TYPE.Entrance;
		} else if (name.includes("Out")){
			return TYPE.Exit;
		} else {
			return TYPE.Fixed;
		}	return 0;
	};
	$.fn.extend({
		animateOnce: function (name, display=false, display_val="initial") {
			var type = _check_type(name);
			// TODO: Remove this dependency
			popup.play();
			switch (type) {
			case TYPE.Entrance:
				this.addClass('animated ' + name).one(end_str, function() {
					// TODO: Remove this dependency
					popup.stop();
					if (verbose) console.log("CSS Animation finished. (Entrance)");
					$(this).removeClass('animated ' + name);
				}).css( (display)?{"display":display_val}:{"visibility":"visible"}
			);
			break;
			case TYPE.Exit:
			this.addClass('animated ' + name).one(end_str, function() {
				// TODO: Remove this dependency
				popup.stop();
				if (verbose) console.log("CSS Animation finished. (Exit)");
				$(this).removeClass('animated ' + name)
				.css( (display)?{"display":"none"}:{"visibility":"hidden"});
			});
			break;
			case TYPE.Fixed:
			this.addClass('animated ' + name).one(end_str, function() {
				// TODO: Remove this dependency
				popup.stop();
				if (verbose) console.log("CSS Animation finished. (Fixed)");
				$(this).removeClass('animated ' + name);
			});
			break;
			default:
			break;
		}
	}
});
})();
