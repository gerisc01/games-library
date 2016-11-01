<?php
require '../../../../vendor/autoload.php'; // include Composer goodies

$client = new MongoDB\Client("mongodb://localhost:27017");
$json = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $dbExists = false;

    $dbs = $client->listDatabases();
    foreach ($dbs as $db) {
        if ($db->getName() == "lists") { 
            $dbExists = true;
            break;
        }
    }

    if (!$dbExists) {
        $client->lists->collections->insertOne(["name"=>"Games","order"=>"1"]);
        $client->lists->collections->insertOne(["name"=>"Movies","order"=>"2"]);

        $json["message"] = "Database initialized. Ready to return data.";
    } else {
        $json["message"] = "Database has been previously initialized. Ready to return data.";
    }

    $jsonStr = json_encode($json,JSON_PRETTY_PRINT);

    http_response_code(200);
    header('Content-Type: application/json');
    echo $jsonStr;
} else {
    $json["error"] = "Method not supported";
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode($json,JSON_PRETTY_PRINT);
    return;
}
?>