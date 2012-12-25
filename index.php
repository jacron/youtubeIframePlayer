<!DOCTYPE html>
<html>
  <head>


    <link type="text/css" rel="stylesheet" href="y.css">

  </head>
  <body>
    <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
    <div id="player"></div>

    <!-- droppable area -->
    <div id="controls">
      <label for="setStart">seek</label>
      <input type="text" id="setStart">
    </div>
    <div id="droparea"></div>

    <script>
      var YPLAYER_url = "<?= $_REQUEST['url'] ?>";
    </script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script src="jquery.droppable.js"></script>
    <script src="keyevent.js"></script>
    <script type="text/javascript" src="y.js"></script>

  </body>
</html>
