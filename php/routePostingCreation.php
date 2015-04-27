<?php
    mysql_connect("devweb2014.cis.strath.ac.uk", "rqb12154", "ellanhod");
    echo "Connected to MySQL<br/>";
    mysql_select_db("rqb12154") or die(mysql_error());
    echo "Connected to Database<br/>";
// Create a MySQL table in the selected database
	mysql_query("DROP TABLE route_board")or die(mysql_error());  
    mysql_query("CREATE TABLE route_board(
    pid MEDIUMINT NOT NULL AUTO_INCREMENT, author VARCHAR(32), location VARCHAR(32), path VARCHAR(100000), rating MEDIUMINT NOT NULL,
     Primary Key(pid))")or die(mysql_error());  
    echo "Table Created!";
?>

