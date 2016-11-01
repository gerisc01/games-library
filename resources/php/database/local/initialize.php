<?php
// Check if db exists
$dbDirectory = realpath(__DIR__."/../../../..")."/db";
if (!file_exists($dbDirectory)) {
    mkdir($dbDirectory,0755);
}

$dbFile = $dbDirectory."/items.json";
if (!file_exists($dbFile)) {
    $initialJson = array();

    $collections = array();
    $collections[] = ["_id" => "1","name" => "Games","order"=>"1"];
    $collections[] = ["_id" => "2","name" => "Movies","order"=>"2"];

    $initialJson["collections"] = $collections;
    $initialJson["lists"] = ["1"=>[],"2"=>[]];
    $initialJson["items"] = ["1"=>json_decode("{}"),"2"=>json_decode("{}")];

    $myfile = fopen($dbFile, "w") or die("Unable to open file!");
    fwrite($myfile, json_encode($initialJson));
    fclose($myfile);
}
?>