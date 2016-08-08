<?php
require 'vendor/autoload.php'; // include Composer goodies

$client = new MongoDB\Client("mongodb://localhost:27017");
$collection = $client->lists->collections;
$sort = ["sort"=>['order' => 1]];
$result = $collection->find([],$sort);

foreach($result as $a) {
    foreach ($a as $k => $v) {
        echo "$k => $v.\n";
    }
}
?>
