<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['user_type']) && isset($_GET['user_name']) && isset($_GET['first_name']) && isset($_GET['last_name']) && isset($_GET['government_ID']) && isset($_GET['zip_code']))
{
    $user_type = $_GET['user_type'];
    $user_name = $_GET['user_name'];
    $first_name = $_GET['first_name'];
    $last_name = $_GET['last_name'];
    $government_ID = $_GET['government_ID'];
    $zip_code = $_GET['contact_number'];

    $success = 1

    $query="SELECT * FROM Voters WHERE user_name='$user_name';
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    if($result->num_rows > 0) {
        $success = 1111; // false, email unavailable
    }

    echo $json_response = json_encode($success);

}
?>