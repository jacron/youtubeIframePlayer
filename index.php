<!DOCTYPE html>
<?php
// youtubeIframePlayer/index.php

$url = isset($_REQUEST['url']) ? $_REQUEST['url'] : '';
$start = 'http://www.youtube.com/embed/u1zgFlCw8Aw?origin=http://yplayer&enablejsapi=1&autohide=1';
//$start = '';
?>
<html>
  <head>
    <link type="text/css" rel="stylesheet" href="y.css">
  </head>
  <body>
    <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
    <!--div id="player"></div-->
    <iframe id="player" type="text/html"
            src="<?=$start ?>"
            frameborder="0">
    </iframe>
    <div id="controls">
      <label for="setStart">seek</label>
      <input type="text" id="setStart">
      <span id="currentTime"></span>
    </div>
    <!-- droppable area -->
    <div id="droparea"></div>
    <script>
      var YPLAYER_url = "<?= $url?>";
    </script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script src="jquery.droppable.js"></script>
    <script src="keyevent.js"></script>
    <script type="text/javascript" src="y.js"></script>
  </body>
</html>
