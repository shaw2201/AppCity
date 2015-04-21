<?php
    mysql_connect("devweb2014.cis.strath.ac.uk", "rqb12154", "ellanhod");
    echo "Connected to MySQL<br/>";
    mysql_select_db("rqb12154") or die(mysql_error());
    echo "Connected to Database<br/>";
// Create a MySQL table in the selected database
	mysql_query("DROP TABLE message_board")or die(mysql_error());
    mysql_query("CREATE TABLE message_board(
    pid MEDIUMINT NOT NULL AUTO_INCREMENT,username VARCHAR(32),message VARCHAR (140),Primary Key(pid))")or die(mysql_error());  
    echo "Table Created!";
?>