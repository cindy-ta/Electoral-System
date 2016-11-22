<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['email']) && isset($_GET['password']) && isset($_GET['user_type']) && isset($_GET['manager_key']))
{
    $email = $_GET['email'];
    $password = $_GET['password'];
    $user_type = $_GET['user_type'];
    $manager_key = $_GET['manager_key'];
    $num = 0;
    $code = rand(100000, 999999);
    $verified = "No";
    $user_name = 1001;
    if($user_type == "Manager")
    {
        $query="Select username from mydb.Users where email_address = '$email' AND manager_key = '$manager_key' AND user_type = '$user_type'";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        if($result->num_rows > 0) {
            $query="Update mydb.Users SET password='$password', verification_code='$code', verified='$verified' where email_address = '$email' AND manager_key = '$manager_key' AND user_type = '$user_type' ";
            $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
            $result = $mysqli->affected_rows;
            if($result > 0)
            {
                $query="Select username from mydb.Users where email_address = '$email' AND manager_key = '$manager_key' AND user_type = '$user_type'";
                $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
                if($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        $user_name = $row["username"];
                    }
                }
                $num = 1111;
            }
        }else
        {
            $num = 111111;
        }
    }else
    {
        $query="Select username from Users where user_type = '$user_type'";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        if($result->num_rows > 0) {
            $query="Select max(username) as id from Users where user_type = '$user_type'";
            $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
            if($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $user_name = $row["id"] + 1;
                }
            }
        }
        $query="INSERT INTO Users (email_address,password,user_type,username,verification_code,verified)  VALUES ('$email', '$password', '$user_type', '$user_name', '$code', '$verified')";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        $result = $mysqli->affected_rows;
        $num = $result;
    }
    // Attempted mail. returning the results of the email sent off
    $to = $email;
    $subject = "Please Confirm Account";
    $message = "Hello,\r\n\r\nThank you for creating your account with us!\r\n\r\nYour verification code is '$code' and your username is '$user_name'\r\n\r\n-The Electoral System team";
    $header = "From:electoral.system.team8@gmail.com \r\n";
    $retval = mail($to,$subject,$message,$header);
    echo $json_response = json_encode($num);
}
?>