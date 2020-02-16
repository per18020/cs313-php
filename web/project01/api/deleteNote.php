<?php

error_reporting(0); // Turn off error reporting. I'll handle my own errors with json

$input = json_decode(file_get_contents('php://input'));
$user_id = htmlspecialchars($input->user_id);
$note_id = htmlspecialchars($input->note_id);

try {
    require "dbConnect.php";
    $db = get_db();
} catch (Exception $e) {
    exit;
}

$query = 'DELETE FROM public.note WHERE user_id=:user_id AND id=:note_id';
$statement = $db->prepare($query);
$statement->bindValue(':user_id', $user_id);
$statement->bindValue(':note_id', $note_id);
$statement->execute();

?>
