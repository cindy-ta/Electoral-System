<?php
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['voter_id']) && isset($_GET['election_id']) && isset($_GET['candidate_id']) && isset($_GET['link_id'])){
    $voter_id = $_GET['voter_id'];
    $election_id = $_GET['election_id'];
    $candidate_id = $_GET['candidate_id'];
    $link_id = $_GET['link_id'];


    $votes = 1;
    $query="Select votes from Link_Candidate_Relations where election_id = '$election_id' and link_id = '$link_id' and candidate_id = '$candidate_id'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $votes = $row["votes"] + 1;
        }
        $query2="UPDATE Link_Candidate_Relations set votes = '$votes' where election_id = '$election_id' and link_id = '$link_id' and candidate_id = '$candidate_id'";
        $result2 = $mysqli->query($query2) or die($mysqli->error.__LINE__);
        $result2 = $mysqli->affected_rows;

        if($result2 > 0)
        {
            $query2="Insert into Election_Voter_Relations (election_id, voter_id) values ('$election_id', '$voter_id')";
            $result3 = $mysqli->query($query2) or die($mysqli->error.__LINE__);
            $result3 = $mysqli->affected_rows;

            if($result3 > 0)
            {
                echo $json_response = json_encode(1);
            }else
            {
                echo $json_response = json_encode(3333333333);
                exit();
            }
        }else
        {
            echo $json_response = json_encode(2222222222);
            exit();
        }

    }else
    {
        echo $json_response = json_encode(1111111111);
        exit();
    }
}

?>