<?php

// error_reporting(0); // Turn off error reporting. I'll handle my own errors with json

$input = json_decode(file_get_contents('php://input'));
$user_id = htmlspecialchars($input->user_id);
$note_id = htmlspecialchars($input->note_id);

$folder_id = htmlspecialchars($input->folder_id);
$note_title = htmlspecialchars($input->note_title);
$note_data = json_decode($input->note_data);



var_dump($input);

try {
    require "dbConnect.php";
    $db = get_db();
} catch (Exception $e) {
    exit;
}

$query = 'UPDATE public.note SET folder_id=:folder_id, title=:note_title, last_edited=Now(), data=JSON_EXTRACT(:note_data) WHERE user_id=:user_id AND id=:note_id';
$statement = $db->prepare($query);
$statement->bindValue(':folder_id', $folder_id);
$statement->bindValue(':note_title', $note_title);
$statement->bindValue(':note_data', $note_data);
$statement->bindValue(':user_id', $user_id);
$statement->bindValue(':note_id', $note_id);
$statement->execute();

var_dump($statement);

?>
