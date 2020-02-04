<?php
    require "dbConnect.php";
    $db = get_db();

    $scripture = $db->prepare("SELECT * FROM scripture");
    $scripture->execute();
    
    echo "<h1>Scripture Resources</h1>";
    while ($sRow = $scripture->fetch(PDO::FETCH_ASSOC)) {
        $book = $sRow["book"];
        $chapter = $sRow["chapter"];
        $verse = $sRow["verse"];
        $content = $sRow["content"];

        echo "<p><strong>$book $chapter:$verse - </strong>\"$content\"</p><br>";
    }
?>