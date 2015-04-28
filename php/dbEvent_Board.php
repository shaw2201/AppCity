<?php
    mysql_connect("devweb2014.cis.strath.ac.uk", "rqb12154", "ellanhod");
    echo "Connected to MySQL<br/>";
    mysql_select_db("rqb12154") or die(mysql_error());
    echo "Connected to Database<br/>";
// Create a MySQL table in the selected database
    //mysql_query("DROP TABLE event_board")or die(mysql_error());
    mysql_query("CREATE TABLE event_board(
    pid MEDIUMINT NOT NULL AUTO_INCREMENT, eventname VARCHAR(32),
    description VARCHAR (140), 
    date DATE, time TIME, location VARCHAR (100), Primary Key(pid))")or die(mysql_error());  
    echo "Table Created!";
?>