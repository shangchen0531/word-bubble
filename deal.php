<?php
    header("Content-type: text/xml");

    echo '<?xml version="1.0"?>'.PHP_EOL;
    echo '<pre>'.PHP_EOL;
    $add = $_GET['add'];
    $arr = file($add);
    foreach ($arr as $st) {
        $st = str_ireplace('/', '|', $st);
        $st = preg_replace('(<俚>)', ' ', $st);
        echo $st;
    }
    echo PHP_EOL.'</pre>';
?>