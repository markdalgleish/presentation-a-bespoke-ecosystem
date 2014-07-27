module.exports = function(options) {
  return function(deck) {

    var video = document.createElement("video");
    var fullscreen = false;

    options = options || {};
    options.width = options.width || "640px";

    video.style.width = options.width;
    video.style.position = "fixed";
    video.style.top = "0px";
    video.style.right = "0px";
    video.style.visibility = "hidden";
    video.style.opacity = "0";

    video.onclick = function() {
      toggleFullScreen();
    }

    var black = document.createElement("div");
    black.style["background-color"] = "black";
    black.style.width = "100%";
    black.style.height = "100%";
    black.style.position = "fixed";
    black.style.top = "0px";
    black.style.left = "0px";
    black.style.visibility = "hidden";

    document.querySelector('body').appendChild(black);
    document.querySelector('body').appendChild(video);

    activateVideo()

    deck.on('activate', function(e) {
      if (e.slide.getAttribute('data-camera') === 'fullscreen') {
        show()
        requestFullscreen()
      } else if (e.slide.getAttribute('data-camera') !== null) {
        show()
        exitFullscreen()
      } else {
        hide()
        setTimeout(exitFullscreen, 500);
      }
    });

    // expose the video
    deck.video = {
      el: video,
      show: show,
      hide: hide,
      requestFullscreen: requestFullscreen,
      exitFullscreen: exitFullscreen,
      toggleFullScreen: toggleFullScreen
    }

    function activateVideo() {
      var errorCallback = function(e) {
        console.log('Reeeejected!', e);
      };

      navigator.getUserMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

      var constraints = {
        //video: {
        // // HD required, then reducing via CSS
        // mandatory: {
        //    minWidth: 1280,
        //    minFrameRate: 30.0
        //  }
        //},
        video: true,
        audio: false
      };

      navigator.getUserMedia(constraints, function(localMediaStream) {
        video.src = window.URL.createObjectURL(localMediaStream);
        video.play();
        video.controls = false;

        // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
        // See crbug.com/110938.
        video.onloadedmetadata = function(e) {
          // Ready to go. Do some stuff.
        };
      }, errorCallback);
    }

    function requestFullscreen() {
      if (fullscreen) {
        return;
      }

      fullscreen = true;
      black.style.visibility = "visible";
      video.style.height = "100%";
      video.style.width = "100%";
    }

    function exitFullscreen() {
      if (!fullscreen) {
        return;
      }

      fullscreen = false;
      black.style.visibility = "hidden";
      video.style.height = "";
      video.style.width = options.width;
    }

    function toggleFullScreen() {
      if (!fullscreen) {
        requestFullscreen()
      } else {
        exitFullscreen()
      }
    }

    function show() {
      // transition to visible
      video.style.opacity = "1";
      video.style.transition = "opacity 0.5s linear";
      video.style.visibility = "visible";
    }

    function hide() {
      // transition to hidden
      video.style.opacity = "0";
      video.style.transition = "visibility 0s 0.25s, opacity 0.25s linear";
      video.style.visibility = "hidden";
    }
  };
};
