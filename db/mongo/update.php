<?php
require '../../vendor/autoload.php'; // include Composer goodies

$client = new MongoDB\Client("mongodb://localhost:27017");
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $body = file_get_contents('php://input');

    // echo $body."\n";

    $json;
    try {
        $json = json_decode($body,true);
    } catch (Exception $e) {
        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode(["error" => "POST body is not properly formatted JSON"]);
        return;
    }

    if (array_key_exists("lists",$json) && $json["lists"] != null) {
        echo "lists\n".json_encode($json["lists"])."\n";
    }

    if (array_key_exists("items",$json) && $json["items"] != null) {
        echo "items\n".json_encode($json["items"])."\n";
    }

    if (array_key_exists("deletedLists",$json) && $json["deletedLists"] != null) {
        echo json_encode($json["deletedLists"])."\n";
    }

    if (array_key_exists("deletedItems",$json) && $json["deletedItems"] != null) {
        echo json_encode($json["deletedItems"])."\n";
    }

    // // Generate collections
    // $result = $client->lists->collections->find([],["sort"=>['order' => 1],"projection"=>['order'=>0]]);
    // $collections = array();
    // foreach($result as $a) {
    //     $collection = array();
    //     foreach ($a as $k => $v) {
    //         if ($k === "_id") {
    //             $collection["id"] = $v;
    //         } else {
    //             $collection[$k] = $v;
    //         }
    //     }
    //     $collections[] = $collection;
    // }
    // $json["collections"] = $collections;

    // // Generating all lists
    // $lists = array();
    // foreach ($collections as $c) {
    //     $listResult = $client->lists->lists->find(["collectionId"=>$c["id"]],["sort"=>['order' => 1],"projection"=>['order'=>0]]);
    //     $collectionsArray = array();
    //     foreach($listResult as $a) {
    //         $list = array();
    //         foreach ($a as $k => $v) {
    //             if ($k === "fields") {
    //                 $fields = array();
    //                 foreach ($v as $f) {
    //                     $fields[] = $f;
    //                 }
    //                 $list["fields"] = $fields;
    //             } else if ($k === "_id") {
    //                 $list["id"] = $v;
    //             } else {
    //                 $list[$k] = $v;
    //             }
    //         }
    //         $collectionsArray[] = $list;
    //     }
    //     $lists[$c["id"]] = $collectionsArray;
    // }
    // $json["lists"] = $lists;

    // // Generate items
    // $items = array();
    // foreach ($collections as $c) {
    //     $collectionsArray = array();
    //     foreach ($lists[$c["id"]] as $l) {
    //         $listsArray = array();
    //         $itemResult = $client->lists->items->find(["collectionId"=>$c["id"],"listId"=>$l["id"]],["sort"=>['order' => 1],"projection"=>['order'=>0]]);
    //         foreach($itemResult as $a) {
    //             $item = array();
    //             foreach ($a as $k => $v) {
    //                 $item[$k] = $v;
    //             }
    //             $listsArray[] = $item;
    //         }
    //         $collectionsArray[$l["id"]] = $listsArray;
    //     }
    //     $items[$c["id"]] = $collectionsArray;
    // }
    // $json["items"] = $items;
    // $jsonStr = json_encode($json,JSON_PRETTY_PRINT);

    // http_response_code(200);
    // header('Content-Type: application/json');
    // echo $jsonStr;
} else {
    http_response_code(405);
    echo "Method is not currently supported\n";
}

?>