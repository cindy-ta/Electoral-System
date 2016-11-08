<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['email_address']))
    {
        $email = $_GET['email_address'];

        $query = "Select verification_code from Users WHERE email_address='$email'";
        $results = $mysqli->query($query) or die($mysqli->error.__LINE__);

        $code = (($results->fetch_assoc())['verification_code']);
        //echo $json_response = json_encode($code);

        $query = "Select username from Users WHERE email_address='$email'";
        $results = $mysqli->query($query) or die($mysqli->error.__LINE__);

        $user_name = (($results->fetch_assoc())['username']);

        //echo $json_response = json_encode($user_name);



        $to = $email;
        $subject = "Please Confirm Account";
        $message = "Hello,\r\n\r\nThank you for creating your account with us!\r\n\r\nYour verification code is '$code' and your username is '$user_name'\r\n\r\n-The Electoral System team";
        $header = "From:electoral.system.team8@gmail.com \r\n";
        $retval = mail($to,$subject,$message,$header);
    }
?>