<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['session']))
{
    $session = $_GET['session'];
    $now = $timestamp = date('i');

    $query="INSERT INTO sessions(last_activity,session_id)  VALUES ('$now', '$session')";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    $result = $mysqli->affected_rows;

    echo $json_response = json_encode($result);
}
?>