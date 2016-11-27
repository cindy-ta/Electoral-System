<?php
require_once '../includes/db.php'; // The mysql database connection script



    $query4 = "Select * from Elections";
    $result4 = $mysqli->query($query4) or die($mysqli->error.__LINE__);

    $arr = array();
    if ($result4->num_rows > 0) {
        while ($row4 = $result4->fetch_assoc()) {
            $election_id = $row4['election_id'];

            $query="SELECT * from Link_Candidate_Relations where election_id='$election_id' ";
            $result2 = $mysqli->query($query) or die($mysqli->error.__LINE__);

            $new2 = array();
            if ($result2->num_rows > 0) {
                while ($row = $result2->fetch_assoc()) {

                    $candidate_id = $row['candidate_id'];


                    $query="SELECT * from Candidates where candidate_id='$candidate_id' ";
                    $result3 = $mysqli->query($query) or die($mysqli->error.__LINE__);

                    if ($result3->num_rows > 0) {
                        while ($row3 = $result3->fetch_assoc()) {
                            $new = array();
                            $new[0] = $row;
                            $new[1] = $row3;
                            $new2[] = $new;

                        }
                    }

                }
            }

            $new3 = array();
            $new3[0] = $row4;
            $new3[1] = $new2;
            $arr[] = $new3;


        }
    }
//
//    $arr2 = array();
//    $query="SELECT * FROM Candidates";
//    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
//
//    $arr = array();
//    if($result->num_rows > 0) {
//        while($row = $result->fetch_assoc()) {
//            $arr2[] = $row;
//        }
//    }
//
//    $arr3 = array();
//    $arr3[0] = $arr;
//    $arr3[1] = $arr2;


    echo $json_response = json_encode($arr);


?>