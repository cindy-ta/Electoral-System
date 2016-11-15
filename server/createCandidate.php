<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['first_name']) && isset($_GET['last_name']) && isset($_GET['party_name']) && isset($_GET['designation']) && isset($_GET['bio']) && isset($_GET['website_link']))
{
    $first_name = $_GET['first_name'];
    $last_name = $_GET['last_name'];
    $party_name = $_GET['party_name'];
    $designation = $_GET['designation'];
    $bio = $_GET['bio'];
    $website_link = $_GET['website_link'];

    $candidate_id = 3001;
    $query="Select candidate_id from Candidates";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    if($result->num_rows > 0) {
        $query="Select max(candidate_id) as id from Candidates";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $candidate_id = $row["id"] + 1;
            }
        }
    }

    $query="INSERT INTO Candidates (candidate_id, first_name, last_name, party_name, designation, bio, website_link)  VALUES ('$candidate_id', '$first_name', '$last_name', '$party_name', '$designation', '$bio', '$website_link')";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    $result = $mysqli->affected_rows;
    if($result == 1)
    {
        echo $json_response = json_encode($candidate_id);
    }else
    {
        $num = "9999999999";
        echo $json_response = json_encode($num);
    }


}
?>