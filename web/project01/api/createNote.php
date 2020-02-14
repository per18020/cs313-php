<?php

error_reporting(0); // Turn off error reporting. I'll handle my own errors with json

$input = json_decode(file_get_contents('php://input'));
$user_id = htmlspecialchars($input->user_id);
$folder_id = htmlspecialchars($input->folder_id);
$note_title = htmlspecialchars($input->note_title);
$data = '{}';

try {
    require "dbConnect.php";
    $db = get_db();
} catch (Exception $e) {
    exit;
}

$query = 'INSERT INTO public.note (user_id, folder_id, title, creation, last_edited, data) VALUES (:user_id, :folder_id, :note_title, Now(), Now(), :data)';
$statement = $db->prepare($query);
$statement->bindValue(':user_id', $user_id);
$statement->bindValue(':folder_id', $folder_id);
$statement->bindValue(':note_title', $note_title);
$statement->bindValue(':data', $data);
$statement->execute();

?>
