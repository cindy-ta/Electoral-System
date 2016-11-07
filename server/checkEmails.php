<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['email']))
{
    $email = $_GET['email'];
    $isEmailAvailable = 1000;

    $query="SELECT * FROM Users WHERE email_address='$email'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    if($result->num_rows > 0) {
        $isEmailAvailable = 0;
    }

    echo $json_response = json_encode($isEmailAvailable);
}
?>