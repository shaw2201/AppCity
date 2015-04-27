<?php
    mysql_connect("devweb2014.cis.strath.ac.uk", "rqb12154", "ellanhod");
    echo "Connected to MySQL<br/>";
    mysql_select_db("rqb12154") or die(mysql_error());
    echo "Connected to Database<br/>";
// Create a MySQL table in the selected database
    mysql_query("CREATE TABLE reply_board(
    rid MEDIUMINT NOT NULL AUTO_INCREMENT, pid MEDIUMINT NOT NULL REFERENCES message_board(pid), 
	username VARCHAR(32), message VARCHAR (140), Primary Key(rid))")or die(mysql_error());  
    echo "Table Created!";
?>