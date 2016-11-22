<?php
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['election_id']))
{
    $election_id = $_GET['election_id'];

    $query="SELECT * FROM Elections WHERE election_id='$election_id' limit 1";

    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    echo $json_response = json_encode($result->fetch_assoc());
}

?>