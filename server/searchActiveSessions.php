<?php
    require_once '../includes/db.php'; // The mysql database connection script
    $status = '%';
    if(isset($_GET['status'])){
        $status = $_GET['status'];
    }
    if(isset($_GET['session'])){
        $session = $_GET['session'];
    }
    $now = $timestamp = date('i');

    $query="UPDATE sessions SET last_activity='$now' WHERE session_id='$session'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    $query="SELECT * FROM sessions WHERE session_id='$session'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    $arr = array();
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
    }

    # JSON-encode the response
    echo $json_response = json_encode($arr);
?>