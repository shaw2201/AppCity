<?php
    mysql_connect("devweb2014.cis.strath.ac.uk", "fqb12152", "Penguin95");
    echo "Connected to MySQL<br/>";
    mysql_select_db("fqb12152") or die(mysql_error());
    echo "Connected to Database<br/>";
// Create a MySQL table in the selected database
	mysql_query("DROP TABLE route_board")or die(mysql_error());  
    mysql_query("CREATE TABLE route_board(
    author VARCHAR(32), location VARCHAR(32), pathVARCHAR(100000),rating MEDIUMINT NOT NULL,
     Primary Key(author))")or die(mysql_error());  
    echo "Table Created!";
?>

