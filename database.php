<?php
require 'vendor/autoload.php'; // include Composer goodies

$client = new MongoDB\Client("mongodb://localhost:27017");
$json = array();

// Generate collections
$result = $client->lists->collections->find([],["sort"=>['order' => 1],"projection"=>['order'=>0]]);
$collections = array();
foreach($result as $a) {
    $collection = array();
    foreach ($a as $k => $v) {
        if ($k === "_id") {
            $collection["id"] = $v;
        } else {
            $collection[$k] = $v;
        }
    }
    $collections[] = $collection;
}
$json["collections"] = $collections;

// Generating all lists
// To properly build list, foreach $collections and then add to lists based on the collection id
$result = $client->lists->lists->find([],["sort"=>['order' => 1],"projection"=>['order'=>0]]);
$lists = array();
foreach($result as $a) {
    $list = array();
    foreach ($a as $k => $v) {
        if ($k === "fields") {
            $fields = array();
            foreach ($v as $f) {
                $fields[] = $f;
            }
            $list["fields"] = $fields;
        } else if ($k === "_id") {
            $list["id"] = $v;
        } else {
            $list[$k] = $v;
        }
    }
    $lists[] = $list;
}
$json["lists"] = $lists;

// Generate items
// To properly build list, foreach $collections and foreach $lists and then add to the collection based on that
$result = $client->lists->items->find([],["sort"=>['order' => 1],"projection"=>['order'=>0,'_id'=>0]]);
$items = array();
foreach($result as $a) {
    $item = array();
    foreach ($a as $k => $v) {
        $item[$k] = $v;
    }
    $items[] = $item;
}
$json["items"] = $items;

$jsonStr = json_encode($json,JSON_PRETTY_PRINT);

echo $jsonStr."\n";
?>
