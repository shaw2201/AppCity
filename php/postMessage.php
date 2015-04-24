<?php

function connectOrDie() {
    $username = "rqb12154";
    $password = "ellanhod";
    $database = "rqb12154";
    $servername = "devweb3000.cis.strath.ac.uk";

    $mysqli = new mysqli($servername, $username, $password, $database);

    if ($mysqli->connect_errno)
        die("Connect failed: %s " . $mysqli->connect_error);

    return $mysqli;
}

function addNewPost($mysqli, $post, $clientID, $clientSideID) {

    if ($mysqli->query('INSERT INTO message_board (`username`, `message`)
                        VALUES (\'' . $clientID . '\', ' . $post .  ')'))
        return $clientSideID;
    else
        die("Query failed: %s " . $mysqli->error);
}

$mysqli = connectOrDie();
$post = mysqli_real_escape_string($mysqli, urldecode($_GET["m"]));
$clientID = mysqli_real_escape_string($mysqli, urldecode($_GET["username"]));
$clientSideID = mysqli_real_escape_string($mysqli, urldecode($_GET["csID"]));
$id = addNewPost($mysqli, $post, $clientID, $clientSideID);
echo "$id";
?>