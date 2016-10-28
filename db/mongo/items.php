<?php
require '../../vendor/autoload.php'; // include Composer goodies

$client = new MongoDB\Client("mongodb://localhost:27017");
$json = array();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $collectionId = filter_input(INPUT_GET,"collection",FILTER_SANITIZE_STRING);
    if ($collectionId == null) {
        $json["error"] = "The following required parameters are missing: 'collection'";
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode($json,JSON_PRETTY_PRINT);
        return;
    }

    // Create an array with all the list ids
    $listResult = $client->lists->lists->find(["collectionId"=>$collectionId],["sort"=>['order' => 1],"projection"=>['_id'=>1]]);
    $items = array();
    foreach($listResult as $l) {
        $items[(string)$l["_id"]] = [];
    }

    // Populate the items into the items array
    $results = $client->lists->items->find(["collectionId"=>$collectionId],["sort"=>['listId'=>1,'order' => 1]]);
    foreach ($results as $item) {
        $item["_id"] = (string)$item["_id"];
        $items[$item["listId"]][] = $item;
    }

    $json["items"] = $items;
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