<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['election_id']) && isset($_GET['sublevel']) && isset($_GET['index']) )
{
    $election_id = $_GET['election_id'];
    $sublevel = $_GET['sublevel'];
    $index = $_GET['index'];

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
        $arr = array();
        $arr[0] = $link_id;
        $arr[1] = (int)$index;
        echo $json_response = json_encode($arr);
    }else
    {
        $num = "9999999999";
        echo $json_response = json_encode($num);
    }


}
?>