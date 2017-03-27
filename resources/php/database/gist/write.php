<?php
error_reporting(E_ALL);
// Get JSON string that will be written into the Gist database, the Gist Id, and the File Name
$dbStr = $_POST["db"];
$dbId = $_POST["id"];
$dbName = $_POST["name"];
// Build the Gist Url and data
$url = 'https://api.github.com/gists/'.$dbId;
$data = ['files' => [$dbName => ["content" => $dbStr]]];
// Load the API Key from the api_keys directory
$dbFile = realpath(__DIR__."/../../../..")."/api_keys/gist.key";
$apiKey = file_get_contents($dbFile);
// Build up the HTTP Request options
// use key 'http' even if you send the request to https://...
$jsonBody = json_encode($data);
$options = array(
    'http' => array(
        'header'  => ["Content-type: application/json\r\nAuthorization: Bearer ".$apiKey."\r\nUser-Agent: Games-Library-App"],
        'method'  => 'PATCH',
        'content' => $jsonBody
    )
);
// Send the build http request
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === FALSE) { /* Handle error */ }
?>