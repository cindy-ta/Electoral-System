<?php
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['manager_id']))
{
    $manager_id = $_GET['manager_id'];

    $query="SELECT * FROM Managers WHERE manager_id='$manager_id' limit 1";

    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    echo $json_response = json_encode($result->fetch_assoc());
}

?>