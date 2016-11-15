<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['election_id']) && isset($_GET['link_id']) && isset($_GET['candidate_id']) )
{
    $election_id = $_GET['election_id'];
    $link_id = $_GET['link_id'];
    $candidate_id = $_GET['candidate_id'];
    $votes = 0;

    $query="INSERT INTO Link_Candidate_Relations (link_id, election_id, candidate_id, votes)  VALUES ('$link_id', '$election_id', '$candidate_id', '$votes')";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    $result = $mysqli->affected_rows;
    if($result == 1)
    {
        echo $json_response = json_encode($votes);
    }else
    {
        $num = "9999999999";
        echo $json_response = json_encode($num);
    }


}
?>