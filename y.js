/*
 * Use youtube api to create a player and open the url.
 * api: see https://developers.google.com/youtube/js_api_reference
 */
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player,
    dropHeight = 100,
    playerMargin = 20,
    dimensions = [],
    timeoutLoad = 1000;

var getDimensions = function() {
  var w = document.documentElement.clientWidth - playerMargin,
      h = w / 640 * 390;

  return {w: w, h: h};
}

var getParms = function(s) {
  //console.log(s);
  var pp = s.split('_and_'),
      parms = {};

  for (var i = 0; i < pp.length; i++) {
    var z = pp[i].split('=');
    parms[z[0]] = z[1];
  }
  return parms;
}

var getIdFromUrl = function(url) {
  // bijv. http://www.youtube.com/watch?feature=player_embedded&v=6TMUCzQwoZQ
  var urlstart = 'www.youtube.com/watch?',
      pos = url.indexOf(urlstart);

  if (pos != -1) {
    // get querystring, bijv. feature=player_embedded&v=6TMUCzQwoZQ
    var qs = url.substr(pos + urlstart.length);
    var parms = getParms(qs);
    //console.log(parms);
    //alert(parms['v']);
    if (parms['v']) {
      //console.log(parms);
      return parms['v'];
    }
  }
  return null;
};

function onYouTubeIframeAPIReady() {
  var dim = getDimensions();

  player = new YT.Player('player', {
    playerVars: {'autohide': 1},
    width:  dim['w'], //'640',
    height: dim['h'], //'390',
    videoId: 'u1zgFlCw8Aw'
  });
  if (typeof player=='undefined') return;

//console.log(player);

  //player.setSize(dim['w'], dim['h']);

  // querystring?
  if (YPLAYER_url) {
    var id = getIdFromUrl(YPLAYER_url);
    //if (id == null) id =  getIdFromV(YPLAYER_url);
    //console.log(YPLAYER_url);
      //  console.log(id);

    if (id != null) {
      setTimeout(function(){
        player.loadVideoById({
          videoId: id,
          //endSeconds: 5,
          suggestedQuality: 'hd1080'  // 'large' = 480px
        });
        player.pauseVideo();
      }, timeoutLoad);
    }
  }
}

$(function() {  // on ready

  // Parse timestring, e.g. 1:02:45.
  var getSeconds = function(v) {
    var w = v.split(":");

    // minuten en seconden
    if (w.length == 2) return w[0] * 60 + w[1] * 1;

    // uren, minuten en seconden
    else if (w.length == 3) return w[0] * 3600 + w[1] * 60 + w[2] * 1;

    // alleen minuten
    else return v * 60; // default: minutes
  };

  // Format time, given in seconds; e.g. 1:02:45.
  var getReadableTime = function(sec) {

    var hours, minutes, seconds = sec;
    var oHours, oMinutes, oSeconds;

    hours = parseInt(seconds / 3600);
    seconds = seconds - (hours * 3600);
    minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds - (minutes * 60));

    oMinutes = minutes < 10? '0' + minutes : minutes;
    oSeconds = seconds < 10? '0' + seconds : seconds;

    oHours = hours > 0? hours + ':' : '';
    oMinutes = oMinutes + ':';

    return oHours + oMinutes + oSeconds;
  };

  // make area droppable
  $('#droparea').droppable(function(text) {

    var id = getIdFromUrl(text);

    if (id != null) {
      player.loadVideoById(id);
    }
  });
  var resizeTimer;

  // Adapt size of player when resizing window.
  $(window).resize(function() {
    var dim = getDimensions();

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
      player.setSize(dim['w'], dim['h']);
    }, 100);
  });

  // seekTo: go to time.
  $('#setStart').keydown(function(e){
    if (e.keyCode == KeyEvent.DOM_VK_RETURN) {
      var v = $(this).val(),
          s = getSeconds(v);

      player.seekTo(s);
      e.stopPropagation();
    }
  });

  // Display current time every second.
  setInterval(function(){
    if (player.getPlayerState && player.getPlayerState() == 1) { // playing
      $('#currentTime').html(getReadableTime(player.getCurrentTime()));
    }
  },1000);
})
