<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['election_id']) && isset($_GET['toEnable']) && isset($_GET['manager_id']))
{
    $manager_id = $_GET['manager_id'];
    $election_id = $_GET['election_id'];
    $toEnable = $_GET['toEnable'];

    $precinct_id = 0;

    $query="SELECT precinct_id as id FROM Precincts where manager_id = '$manager_id'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $precinct_id = (int)$row['id'];
        }
    }else
    {
        echo $json_response = json_encode("3333333333");
        exit();
    }


    $query="Update Poll_Statuses set isEnabled = '$toEnable' where precinct_id = '$precinct_id' and election_id = '$election_id'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    $result = $mysqli->affected_rows;
    if($result == 1)
    {
        echo $json_response = json_encode($result);
    }else
    {
        $query="insert into Poll_Statuses (precinct_id, election_id, isEnabled) values ('$precinct_id', '$election_id', '$toEnable')";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        $result = $mysqli->affected_rows;
        if($result == 1)
        {
            echo $json_response = json_encode($result);
        }else
        {
            echo $json_response = json_encode("9999999999");
            exit();
        }
    }


}
?>