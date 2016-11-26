<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['voter_id']) && isset($_GET['election_id']))
{
    $voter_id = $_GET['voter_id'];
    $election_id = $_GET['election_id'];

    $success = 1;

    $query="SELECT * FROM Election_Voter_Relations WHERE voter_id ='$voter_id' and election_id = '$election_id'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    if($result->num_rows > 0) {
        $success = 1111;
    }

    echo $json_response = json_encode($success);
}
?>