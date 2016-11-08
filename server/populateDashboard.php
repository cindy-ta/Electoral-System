<?php
require_once '../includes/db.php'; // The mysql database connection script

    $arr = array();
    $election_id = 1;

    $query="SELECT * FROM Elections WHERE election_id='$election_id'";
    $election_title = $mysqli->query($query) or die($mysqli->error.__LINE__);

    echo $json_response = json_encode($election_title->fetch_assoc());

    /*$query="SELECT candidate_id from Link_Candidate_Relations WHERE election_id='1' GROUP BY candidate_id"
    $totalNumCandidates = $mysqli->query($query) or die($mysqli->error.__LINE__);

    if($totalNumCandidates->num_rows > 0) {
        while($row = $totalNumCandidates->fetch_assoc()) {
            $arr[] = $row;
        }
    }

    echo $json_response = json_encode($arr);*/

 /*   // CANDIDATE INFO
    $query="SELECT candidate_id from Link_Candidate_Relations WHERE election_id='1' GROUP BY candidate_id "
    $totalNumCandidates = $mysqli->query($query) or die($mysqli->error.__LINE__);


    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
    }

    echo $json_response = json_encode($arr);

   /* $arr = array();
    $arr[] = $election_title;
    $arr[] = $election_description
    $arr[] = $election_startDate
    $arr[] = $election_endDate
    $arr[] = $totalNumCandidates*/

/*
    $i = 0;
    $candidate = array();

    if($totalNumCandidates->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $candidate[$i] = $row["candidate_id"];
            $i++;
        }
    }






    $query="SELECT candidate_id FROM Link_Candidate_Relations where election_id='$election_id'"
    $candidates = $mysqli->query($query) or die($mysqli->error.__LINE__); // finds candidates

    $query="SELECT * FROM Candidates WHERE candidate_id='$candidates'"
    $result += $mysqli->query($query) or die($mysqli->error.__LINE__); // appends candidates to the end of results??
*/

/*

$election_id = 1;

    // ELECTION DETAILS: Title, description, start/end date.
    $query="SELECT title FROM Elections WHERE election_id='$election_id'";
    $election_title = $mysqli->query($query) or die($mysqli->error.__LINE__);

    echo $json_response = json_encode($election_title->fetch_assoc());
    */


?>







