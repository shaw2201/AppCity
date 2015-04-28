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
function addNewEvent($mysqli, $name, $description, $date, $time, $location, $clientSideID) {

    if ($mysqli->query("INSERT INTO event_board (eventname, description, date,
                        time, location)
                        VALUES ('$name','$description','$date','$time','$location')"))
        return $clientSideID;
    else
        die("Query failed: %s " . $mysqli->error);
}
$mysqli = connectOrDie();
$name = mysqli_real_escape_string($mysqli, urldecode($_GET["n"]));
$description = mysqli_real_escape_string($mysqli, urldecode($_GET["d"]));
$date = mysqli_real_escape_string($mysqli, urldecode($_GET["date"]));
$time = mysqli_real_escape_string($mysqli, urldecode($_GET["t"]));
$location = mysqli_real_escape_string($mysqli, urldecode($_GET["l"]));
$clientSideID = mysqli_real_escape_string($mysqli, urldecode($_GET["csID"]));
$id = addNewEvent($mysqli, $name, $description, $date, $time, $location, $clientSideID);
echo "$id";
?>