<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['precinct_id']) && isset($_GET['manager_id']))
{
    $precinct_id = $_GET['precinct_id'];
    $manager_id = $_GET['manager_id'];

    $success = 1;


    $query="UPDATE Precincts SET manager_id='$manager_id' WHERE precinct_id='$precinct_id'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);


    if($result->num_rows > 0) {
        $success = 1111;
    }

    echo $json_response = json_encode($success);
}
?>