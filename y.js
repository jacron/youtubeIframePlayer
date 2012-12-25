/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player,
    dropHeight = 100,
    playerMargin = 40,
    dimensions = [];

var getIdFromUrl = function(url) {
  var urlstart = 'www.youtube.com/watch?v=',
      pos = url.indexOf(urlstart);

  if (pos != -1) {
    url = url.substr(pos + urlstart.length);
    pos = url.indexOf('&');
    if (pos != -1) {
      url = url.substr(0, pos);
    }
    return url;
  }
  return null;
};

function getDimensions() {
  var w = document.documentElement.clientWidth - playerMargin,
      h = w / 640 * 390;

  return {w: w, h: h};
}

function onYouTubeIframeAPIReady() {
  var dim = getDimensions();

  player = new YT.Player('player', {
    playerVars: {'autohide': 1},
    width:  dim['w'], //'640',
    height: dim['h'], //'390',
    videoId: 'u1zgFlCw8Aw'
  });

  // querystring?
  if (YPLAYER_url) {
    var id = getIdFromUrl(YPLAYER_url);

    if (id != null) {
      setTimeout(function(){
        player.loadVideoById(id);
      }, 500);
    }
  }
}

$(function() {  // on ready
  var getSeconds = function(v) {
    var w = v.split(":");

    if (w.length == 2) return w[0] * 60 + w[1] * 1;
    else if (w.length == 3) return w[0] * 3600 + w[1] * 60 + w[2] * 1;
    else return v * 60; // default: minutes
  };

  // make area droppable
  $('#droparea').droppable(function(text) {

    var id = getIdFromUrl(text);

    if (id != null) {
      player.loadVideoById(id);
    }
  });
  var resizeTimer;

  // adapt player when resizing window
  $(window).resize(function() {
    var dim = getDimensions();

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
      player.setSize(dim['w'], dim['h']);
    }, 100);
  });

  // seekTo
  $('#setStart').keydown(function(e){
    if (e.keyCode == KeyEvent.DOM_VK_RETURN) {
      var v = $(this).val(),
          s = getSeconds(v);

      player.seekTo(s);
      e.stopPropagation();
    }
  });

})
