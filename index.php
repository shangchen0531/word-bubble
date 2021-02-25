<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>词汇练习</title>
        <link href="decorate.css" rel="stylesheet" type="text/css">
        <script src="jQuery.js" type="text/javascript"></script>
        <script src="animate.js" type="text/javascript" defer="defer"></script>
        <script src="canvas-nest.js" type="text/javascript" defer="defer" color="160,32,240" opacity="0.7" zindex="-2" count="200"></script>
    </head>
    
    <body>
        <div id="chooseList">
            <?php
                $arr = array();
                echo '<select name="wordlists">';
                $path = './vocabulary/';
                if (is_dir($path)) {
                    $dir = scandir($path);
                    foreach($dir as $val) {
                        if ($val == '.' or $val == '..') {
                            continue;
                        }
                        $pos = strpos($val, '.txt');
                        if ($pos != False) {
                            $val2 = substr($val, 0, $pos);
                            echo "<option value='$val'>$val2</option>";
                        }
                    }
                }
                else {
                    echo '路径出错';
                }
                echo '</select>';
            ?>
        </div>
        <!-- <div id="canvasContainer">
            <canvas id="test-canvas"></canvas>
        </div> -->
        
    </body>
</html>