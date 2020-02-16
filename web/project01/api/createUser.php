<?php

error_reporting(0); // Turn off error reporting. I'll handle my own errors with json

$input = json_decode(file_get_contents('php://input'));
$email = htmlspecialchars($input->email);
$username = htmlspecialchars($input->username);
$password = htmlspecialchars($input->password);

$response = new stdClass();
$response->error = false;

try {
    require "dbConnect.php";
    $db = get_db();

    $query = 'INSERT INTO public.user (email, username, password) VALUES (:email, :username, :password)';
    $statement = $db->prepare($query);
    $statement->bindValue(':email', $email);
    $statement->bindValue(':username', $username);
    $statement->bindValue(':password', $password);
    $statement->execute();
    
} catch(Exception $e) {
    $response->error = true;
    $response->errormsg = $e->getMessage();
    echo json_encode($response);
    exit;
}

?>
