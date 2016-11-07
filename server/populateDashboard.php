<?php
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['election_id'])) // will need to be precinct..
{
    $election_id = $_GET['election_id'];

    // ELECTION DETAILS: Title, description, start/end date.
    $query="SELECT title FROM Elections WHERE election_id='$election_id'";
    $election_title = $mysqli->query($query) or die($mysqli->error.__LINE__);

    $query="SELECT description FROM Elections WHERE election_id='$election_id'"
    $election_description = $mysqli->query($query) or die($mysqli->error.__LINE__);

    $query="SELECT start_date FROM Elections WHERE election_id='$election_id'"
    $election_startDate = $mysqli->query($query) or die($mysqli->error.__LINE__);

    $query="SELECT end_date FROM Elections WHERE election_id='$election_id'"
    $election_endDate = $mysqli->query($query) or die($mysqli->error.__LINE__);

    // CANDIDATE INFO
    $query="SELECT candidate_id from Link_Candidate_Relations WHERE election_id='1' GROUP BY candidate_id "
    $totalNumCandidates = $mysqli->query($query) or die($mysqli->error.__LINE__);

    $arr = array();
    $arr[] = $election_title;
    $arr[] = $election_description
    $arr[] = $election_startDate
    $arr[] = $election_endDate
    $arr[] = $totalNumCandidates

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


    echo $json_response = json_encode($arr);
}


?>