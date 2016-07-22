<?php
$db = $_POST["db"];
$fileName = $_POST['fileName'];

$dbStr = json_encode($db);

$myfile = fopen($fileName, "w") or die("Unable to open file!");
fwrite($myfile, $dbStr);
fclose($myfile);
?>