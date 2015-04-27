<?php
    mysql_connect("devweb2014.cis.strath.ac.uk", "rqb12154", "ellanhod");
    echo "Connected to MySQL<br/>";
    mysql_select_db("rqb12154") or die(mysql_error());
    echo "Connected to Database<br/>";
    // Create a MySQL table in the selected database
    mysql_query("DROP TABLE reply_board") or die(mysql_error());
    echo "reply_board Dropped!";
    mysql_query("DROP TABLE message_board") or die(mysql_error());
    echo "message_board Dropped!";
?>