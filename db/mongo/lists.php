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

    // Generating all lists based on the inputted collection id
    $listResult = $client->lists->lists->find(["collectionId"=>$collectionId],["sort"=>['order' => 1]]);
    $lists = array();
    foreach($listResult as $a) {
        $list = array();
        foreach ($a as $k => $v) {
            // Converts fields to an array instead of a hash
            if ($k === "fields") {
                $fields = array();
                foreach ($v as $f) {
                    $fields[] = $f;
                }
                $list["fields"] = $fields;
            } else if ($k == "_id") {
                $list["_id"] = (string)$v;
            } else {
                $list[$k] = $v;
            }
        }
        $lists[] = $list;
    }
    $json["lists"] = $lists;

    $jsonStr = json_encode($json,JSON_PRETTY_PRINT);

    http_response_code(200);
    header('Content-Type: application/json');
    echo $jsonStr;
} else {
    http_response_code(405);
    echo "Method is not currently supported\n";
}

?>