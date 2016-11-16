<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['email']))
{
    $email = $_GET['email'];
    $isEmailAvailable = 1000; // true, email available

    $query="SELECT * FROM Users WHERE email_address='$email' AND user_type='Voter'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    if($result->num_rows > 0) {
        $isEmailAvailable = 0; // false, email unavailable
    }

    echo $json_response = json_encode($isEmailAvailable);
}
?>