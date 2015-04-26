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

function getPosts($mysqli, $last) {
    if ($result = $mysqli->query('SELECT * FROM `message_board` WHERE `pid`>' . $last . ' ORDER BY `pid` ASC')) {
        $comments = array();

        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $comments[] = $row;
        }
        $result->close();

        return $comments;
    } else {
        die("Query failed: %s " . $mysqli->error);
    }
}

header("Content-Type: text/plain");
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past

$mysqli = connectOrDie();
$last = mysqli_real_escape_string($mysqli, urldecode(isset($_GET["last"]) ? $_GET["last"] : 0));
$lines = getPosts($mysqli, $last);
foreach ($lines as $line) {
    echo json_encode($line) . "\n";
}
?>