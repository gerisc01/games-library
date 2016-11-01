<?php
$dbStr = $_POST["db"];
$dbFile = realpath(__DIR__."/../../../..")."/db/items.json";

$myfile = fopen($dbFile, "w") or die("Unable to open file!");
fwrite($myfile, $dbStr);
fclose($myfile);
?>