<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['voter_id']) )
{
    $voter_id = $_GET['voter_id'];

    $age = 0;
    $query="select age from Voters where voter_id = '$voter_id'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $age = (int)$row['age'];
        }
    }else
    {
        echo $json_response = json_encode("4444444444");
        exit();
    }


    echo $json_response = json_encode($age);

}
?>