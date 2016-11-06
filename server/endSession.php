<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['session'])){
    $session = $_GET['session'];

    $query="DELETE FROM sessions WHERE session_id='$session'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    $result = $mysqli->affected_rows;

    echo $json_response = json_encode($result);
}
?>