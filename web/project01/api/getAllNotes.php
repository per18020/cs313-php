<?php
    error_reporting(0); // Turn off error reporting. I'll handle my own errors with json

    $input = json_decode(file_get_contents('php://input'));
    $user_id = htmlspecialchars($input->id);

    $response = new stdClass();
    $response->notes = [];
    $response->error = false;

    $db = NULL;

    // necessary to catch errors thrown from other requried files
    function exception_error_handler($errno, $errstr, $errfile, $errline) {
        throw new ErrorException($errstr, $errno, 0, $errfile, $errline);
    }
    set_error_handler("exception_error_handler");

    // if db doesn't exist
    try {
        require "dbConnect.php";
        $db = get_db();
    } catch (Exception $e) {
        $response->error = true;
        echo json_encode($response);
        exit;
    }

    $usersPDO = $db->prepare("SELECT * FROM public.note WHERE user_id = $user_id");
    $usersPDO->execute();
    
    while ($row = $usersPDO->fetch(PDO::FETCH_ASSOC)) {
        $note = new stdClass();
        $note->id = $row["id"];
        $note->folder_id = $row["folder_id"];
        $note->title = $row["title"];
        $note->creation = $row["creation"];
        $note->last_edited = $row["last_edited"];
        $note->data = $row["data"];

        array_push($response->notes, $note);
    }

    echo json_encode($response);
