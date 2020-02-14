<?php

error_reporting(0); // Turn off error reporting. I'll handle my own errors with json

$input = json_decode(file_get_contents('php://input'));
$user_id = htmlspecialchars($input->user_id);
$folder_title = htmlspecialchars($input->folder_title);

try {
    require "dbConnect.php";
    $db = get_db();
} catch (Exception $e) {
    exit;
}

$query = 'INSERT INTO public.folder (user_id, title) VALUES (:user_id, :folder_title)';
$statement = $db->prepare($query);
$statement->bindValue(':user_id', $user_id);
$statement->bindValue(':folder_title', $folder_title);
$statement->execute();

?>
