<?php
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['candidate_id'])){
    $candidate = $_GET['candidate_id'];

    $query="SELECT * from Candidates WHERE candidate_id='$candidate'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    echo $json_response = json_encode($result->fetch_assoc());
}

?>