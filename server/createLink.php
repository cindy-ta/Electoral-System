<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['election_id']) && isset($_GET['sublevel']) )
{
    $election_id = $_GET['election_id'];
    $sublevel = $_GET['sublevel'];

    $link_id = 1;
    $query="Select max(link_id) as id from Links where election_id = '$election_id'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $link_id = $row["id"] + 1;
        }
    }


    $query="INSERT INTO Links (link_id, election_id, sublevel)  VALUES ('$link_id', '$election_id', '$sublevel')";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    $result = $mysqli->affected_rows;
    if($result == 1)
    {
        echo $json_response = json_encode($link_id);
    }else
    {
        $num = "9999999999";
        echo $json_response = json_encode($num);
    }


}
?>