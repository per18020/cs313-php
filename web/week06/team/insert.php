<?php
$book = $_POST['book'];
$chapter = $_POST['chapter'];
$verse = $_POST['verse'];
$content = $_POST['content'];

require("dbConnect.php");
$db = get_db();

try
{
	$query = 'INSERT INTO scripture (book, chapter, verse, content) VALUES (:book, :chapter, :verse, :content)';
	$statement = $db->prepare($query);
	$statement->bindValue(':book', $book);
	$statement->bindValue(':chapter', $chapter);
    $statement->bindValue(':verse', $verse);
    $statement->bindValue(':content', $content);
	$statement->execute();
	
	// SELECT c.relname FROM pg_class c WHERE c.relkind = 'S';   -- display all sequences
	// get id of last inserted row - save in $userId
	$userId = $db->lastInsertId("scripture_id_seq");
}
catch (Exception $ex)
{
	echo "Error with DB. Details: $ex";
	die();
}
header("Location: display.php/?scriptureId=$scripture");

die(); 
?>
