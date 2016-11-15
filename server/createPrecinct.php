<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['zipcode_start']) && isset($_GET['zipcode_end']) && isset($_GET['manager_id']))
{
    $zipcode_start = $_GET['zipcode_start'];
    $zipcode_end = $_GET['zipcode_end'];
    $manager_id = $_GET['manager_id'];

    $precinct_id = 1;
    $query="Select max(precinct_id) as id from Precincts";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $precinct_id = $row["id"] + 1;
        }
    }


    $query="INSERT INTO Precincts (precinct_id, zipcode_start, zipcode_end, manager_id)  VALUES ('$precinct_id', '$zipcode_start', '$zipcode_end', '$manager_id')";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    $result = $mysqli->affected_rows;
    if($result == 1)
    {
        echo $json_response = json_encode($precinct_id);
    }else
    {
        $num = "9999999999";
        echo $json_response = json_encode($num);
    }


}
?>