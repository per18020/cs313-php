<?php
    error_reporting(E_ALL ^ E_WARNING);

    $input = json_decode(file_get_contents('php://input'));
    $user_id = htmlspecialchars($input->id);

    $response = new stdClass();
    $response->folders = [];
    $response->error = false;

    $db = NULL;

    // necessary to catch errors thrown from other requried files
    function exception_error_handler($errno, $errstr, $errfile, $errline ) {
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

    $foldersPDO = $db->prepare("SELECT * FROM public.folder WHERE user_id = $user_id");
    $foldersPDO->execute();
    
    while ($fRow = $foldersPDO->fetch(PDO::FETCH_ASSOC)) {
        $folder->id = $fRow["id"];
        $folder->title = $fRow["title"];

        array_push($response->folders, $folder);
    }

    echo json_encode($response);
