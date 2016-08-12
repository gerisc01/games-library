<?php
$dbStr = $_POST["db"];
$fileName = $_POST['fileName'];

$myfile = fopen($fileName, "w") or die("Unable to open file!");
fwrite($myfile, $dbStr);
fclose($myfile);
?>