<?php

function connectOrDie() {
    $username = "rqb12154";
    $password = "ellanhod";
    $database = "rqb12154";
    $servername = "devweb2014.cis.strath.ac.uk";

    $mysqli = new mysqli($servername, $username, $password, $database);

    if ($mysqli->connect_errno)
        die("Connect failed: %s " . $mysqli->connect_error);

    return $mysqli;
}

function addNewPath($mysqli, $location, $clientID, $clientSideID, $lat, $long, $des) {
        
    if ($mysqli->query("INSERT INTO route_board (author, location, lat, longitude, description)
                        VALUES ('$clientID','$location', '$lat', '$long','$des')"))
        return $clientSideID;
    else
        die("Query failed: %s " . $mysqli->error);
}

$mysqli = connectOrDie();
$location = mysqli_real_escape_string($mysqli, urldecode($_GET["location"]));
$clientID = mysqli_real_escape_string($mysqli, urldecode($_GET["author"]));
$clientSideID = mysqli_real_escape_string($mysqli, urldecode($_GET["csID"]));
$lat = mysqli_real_escape_string($mysqli, urldecode($_GET["lat"]));
$longitude = mysqli_real_escape_string($mysqli, urldecode($_GET["long"]));
$des = mysqli_real_escape_string($mysqli, urldecode($_GET["description"]));
$id = addNewPath($mysqli, $location, $clientID, $clientSideID, $lat, $longitude, $des);
echo "$id";
?>