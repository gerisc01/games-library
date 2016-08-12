<?php
require '../../vendor/autoload.php'; // include Composer goodies

$client = new MongoDB\Client("mongodb://localhost:27017");
$json = array();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Generate collections
    $results = $client->lists->collections->find([],["sort"=>['order' => 1],"projection"=>['order'=>0]]);
    $collections = array();
    foreach ($results as $collection) {
        $collections[] = $collection;
    }
    $json["collections"] = $collections;

    $jsonStr = json_encode($json,JSON_PRETTY_PRINT);

    http_response_code(200);
    header('Content-Type: application/json');
    echo $jsonStr;
} else {
    http_response_code(405);
    echo "Method is not currently supported\n";
}
?>