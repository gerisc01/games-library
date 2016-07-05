<?php

// Fields Types
$types = array(
    "name"         => "string",
    "length"       => "int",
    "lengthPlayed" => "int",
    "platform"     => "string",
    "genre"        => "string",
    "notes"        => "string",
    "list"         => "string",
    "listPos"      => "int"
);
$requiredFields = array("name","length","list","listPos");
$idField = "name";

// Name of file where data is stored
$fileName = "items.json";

// Initializing variables
$update = false;
$name; $length; $lengthPlayed; $platform; $genre; $notes;
// Parsing specific data for the item
if($_SERVER['REQUEST_METHOD'] == 'PUT') {
    // Set the update variable to true because it is a PUT
    $update = true;

    parse_str(file_get_contents("php://input"),$input);
    $name         = $input["name"];
    $length       = $input["length"];
    $lengthPlayed = $input["lengthPlayed"];
    $platform     = $input["platform"];
    $genre        = $input["genre"];
    $notes        = $input["notes"];
    $list         = $input["list"];
    $listPos      = $input["listPos"];
} elseif($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!is_null($_POST["update"]) && strtolower($_POST["update"]) == "true") {
        $update = true;
    }

    $name         = $_POST["name"];
    $length       = $_POST["length"];
    $lengthPlayed = $_POST["lengthPlayed"];
    $platform     = $_POST["platform"];
    $genre        = $_POST["genre"];
    $notes        = $_POST["notes"];
    $list         = $_POST["list"];
    $listPos      = $_POST["listPos"];
}

// Build the array entirely out of strings
$newItem = array(
    "name"         => $name,
    "length"       => $length,
    "lengthPlayed" => $lengthPlayed,
    "platform"     => $platform,
    "genre"        => $genre,
    "notes"        => $notes,
    "list"         => $list,
    "listPos"      => $listPos
);

// Iterate through the array and do any error checking and type conversion
// needed to create it into the "real" item object. Also validate that required
// fields are present.
$matches;
foreach ($newItem as $key => $val) {
    // Throw an error if a required field is not present
    if (in_array($key,$requiredFields) && $val == null) {exit("Failure: The field '".$key."' is required.\r\n"); }

    // echo $key;
    // echo $types[$key]."\n";
    if ($types[$key] == "int") {
        $newItem[$key] = (int)$val;
    } elseif (1 == preg_match("/int\((\d+),(\d+)\)/i",$types[$key],$matches)) {
        // First convert the val into an int
        $newItem[$key] = (int)$val;
        // Use the regex match to see if the value is within the specified upper and lower bounds
        if ((int)$matches[1] > $newItem[$key] || $newItem[$key] > (int)$matches[2]) {
            exit("Failure: The value '".$newItem[$key]."' for field '".$key."' is not an int between ".$matches[1]." and ".$matches[2].".\r\n");
        }
    }
}

// Load up the 'database' file
if (file_exists($fileName)) {
    $myfile = fopen($fileName, "r") or die("Unable to open users file!");
    $dbStr = fread($myfile,filesize($fileName));
    fclose($myfile);
} else {
    $dbStr = '{"items : []}';
}

$items = json_decode($dbStr,true)["items"];
if (is_null($items)) { $items = []; }

// Check to see if the id already exists, and if so load the index into $foundItemIndex
$foundItemIndex;
foreach ($items as $index => $item) {
    if ($item[$idField] == $newItem[$idField]) {
        $foundItemIndex = $index;
    }
}

// Check if there were errors when searching for an id
$error = null;
if (!$update && !is_null($foundItemIndex)) {
    $error = "Failure: A record with the id '".$newItem[$idField]."' already exists.";
} elseif ($update && is_null($foundItemIndex)) {
    $error = "Failure: A record with the id '".$newItem[$idField]."' could not be found.";
}

// If there was an error, exit the script with an error
if (!is_null($error)) {
    exit($error."\r\n");
}

// Update $items with the $newItem if there are still no errors
if (!$update) {
    array_push($items,$newItem);
} else {
    foreach ($newItem as $key => $val) {
        if ($val != null) {
            $items[$foundItemIndex][$key] = $val;
        }
    }
    // Save the full item into $newItem so the full object can be returned if the call is successful
    $newItem = $items[$foundItemIndex];
}

$dbObj = array("items" => $items);
$dbStr = json_encode($dbObj);

$myfile = fopen($fileName, "w") or die("Unable to open file!");
fwrite($myfile, $dbStr);
fclose($myfile);

echo json_encode($newItem);
?>