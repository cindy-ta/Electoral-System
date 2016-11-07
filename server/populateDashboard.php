<?php
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['election_id'])) // will need to be precinct..
{
    $election_id = $_GET['election_id'];

    $query="SELECT * FROM Elections WHERE election_id='$election_id'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__); // info about specific Election

    $query="SELECT candidate_id FROM mydb.Link_Candidate_Relations where election_id='$election_id'"
    $candidates = $mysqli->query($query) or die($mysqli->error.__LINE__); // finds candidates

    $query="SELECT * FROM Candidates WHERE candidate_id='$candidates'"
    $result += $mysqli->query($query) or die($mysqli->error.__LINE__); // appends candidates to the end of results??

    echo $json_response = json_encode($result);
}


?>