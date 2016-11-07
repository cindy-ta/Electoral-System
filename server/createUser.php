<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['email']) && isset($_GET['password']) && isset($_GET['user_type']))
{
    $email = $_GET['email'];
    $password = $_GET['password'];
    $user_type = $_GET['user_type'];

    $user_name = 1001;
    if($user_type == "manager")
    {
        $user_name = 8001;
    }

    $query="Select max(username) as id from Users where user_type = '$user_type'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $user_name = $row["id"] + 1;
            }
     }

    $code = rand(100000, 999999);
    $verified = "No";

    $query="INSERT INTO Users (email_address,password,user_type,username,verification_code,verified)  VALUES ('$email', '$password', '$user_type', '$user_name', '$code', '$verified')";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    $result = $mysqli->affected_rows;

    // Attempted mail. returning the results of the email sent off

    //$result = $mail($email, "Congratulations!", "Hello,\r\n\r\nThank you for creating your account with us!\r\n\r\nYour verification code is '$code' and your username is '$user_name'\r\n\r\n-The Electoral System team", 'From: electoral-system@gmail.com');

    echo $json_response = json_encode($result);
}
?>