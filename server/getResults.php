<?php
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['election_id']) && isset($_GET['link_id'])){
    $election_id = $_GET['election_id'];
    $link_id = $_GET['link_id'];


    $query="SELECT * from Link_Candidate_Relations where election_id='$election_id' and link_id='$link_id' ";
    $result2 = $mysqli->query($query) or die($mysqli->error.__LINE__);

    $arr = array();
    if ($result2->num_rows > 0) {
        while ($row = $result2->fetch_assoc()) {
            $candidate_id = $row['candidate_id'];

            $query2="SELECT * from Candidates where candidate_id='$candidate_id'";
            $result3 = $mysqli->query($query2) or die($mysqli->error.__LINE__);

            if ($result3->num_rows > 0) {
                while ($row2 = $result3->fetch_assoc()) {
                    $new = array();
                    $new[0] = $row;
                    $new[1] = $row2;
                    $arr[] = $new;
                }
            }

        }
    }

    echo $json_response = json_encode($arr);
}

?>