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

function addNewPost($mysqli, $reply, $username, $clientSideID, $pid) {

    if ($mysqli->query("INSERT INTO reply_board (username, message, pid)
                        VALUES ('$username','$reply','$pid')")) {
        return $clientSideID;
    } else {
        die("Query failed: %s " . $mysqli->error);
    }
}

$mysqli = connectOrDie();

$post = mysqli_real_escape_string($mysqli, urldecode($_GET["m"]));

$clientID = mysqli_real_escape_string($mysqli, urldecode($_GET["username"]));

$clientSideID = mysqli_real_escape_string($mysqli, urldecode($_GET["RID"]));

$pid = mysqli_real_escape_string($mysqli, urldecode($_GET["PID"]));

$id = addNewPost($mysqli, $post, $clientID, $clientSideID, $pid);

echo "$id";
?>