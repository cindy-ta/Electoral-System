<?php
require_once '../includes/db.php'; // The mysql database connection script
//if(isset($_GET['user_name']) && isset($_GET['user_type']))
//{
    $username = $_GET['user_name'];
    $success = 1;
    $user_type = $_GET['user_type'];
    $first_name = $_GET['first_name'];
    $last_name = $_GET['last_name'];
    $government_id = $_GET['government_id'];
    $zip_code = $_GET['zip_code'];




    if ($user_type == "Voter"){
        $query="SELECT * FROM Voters WHERE voter_id ='$username'";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    }
    else{ //if($user_type == false){
        $query="SELECT * FROM Managers WHERE manager_id ='$username'";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    }

    if($result->num_rows > 0) {
        $success = 1111;
    }

    echo $json_response = json_encode($success);
//}
?>