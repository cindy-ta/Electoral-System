<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['title']) && isset($_GET['description']) && isset($_GET['start_date']) && isset($_GET['end_date']) && isset($_GET['level']) )
{
    $title = $_GET['title'];
    $description = $_GET['description'];
    $start_date = $_GET['start_date'];
    $end_date = $_GET['end_date'];
    $level = $_GET['level'];

    $election_id = 1;
    $query="Select max(election_id) as id from Elections";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $election_id = $row["id"] + 1;
        }
    }


    $query="INSERT INTO Elections (election_id, title, description, start_date, end_date, level)  VALUES ('$election_id', '$title', '$description', '$start_date', '$end_date', '$level')";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    $result = $mysqli->affected_rows;
    if($result == 1)
    {
        echo $json_response = json_encode($election_id);
    }else
    {
        $num = "9999999999";
        echo $json_response = json_encode($num);
    }


}
?>