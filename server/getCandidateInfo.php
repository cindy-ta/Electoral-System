<?php
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['election_id']) && isset($_GET['link_id'])){
    $election_id = $_GET['election_id'];
    $link_id = $_GET['link_id'];

    $query="SELECT candidate_id from Link_Candidate_Relations WHERE election_id='$election_id' and link_id='$link_id' GROUP BY candidate_id";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    $arr = array();
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $candidate_id = $row[candidate_id];

            $query="SELECT * from Candidates WHERE candidate_id='$candidate_id'";
            $result2 = $mysqli->query($query) or die($mysqli->error.__LINE__);

            if ($result2->num_rows > 0) {
                while ($row2 = $result2->fetch_assoc()) {
                    $arr[] = $row2;
                }
            }
        }
    }




    echo $json_response = json_encode($arr);
}

?>