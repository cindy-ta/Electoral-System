<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['user_name']) && isset($_GET['password']) && isset($_GET['code']))
{
    $user_name = $_GET['user_name'];
    $password = $_GET['password'];
    $code = $_GET['code'];
     $isVerified = 1111;
     $verified = "Yes";
    $query="Update mydb.Users SET verified='$verified' WHERE username='$user_name' AND password = '$password' AND verification_code = '$code'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    if(($mysqli->affected_rows) > 0) {
        $isVerified = 1;
    }
    echo $json_response = json_encode($isVerified);
}
?>