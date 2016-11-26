<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['user_name']) && isset($_GET['user_type']))
{
    $username = $_GET['user_name'];
    $user_type = $_GET['user_type'];

    $success = 1;

    if ($user_type == "Voter"){
        $query="SELECT * FROM Voters, Addresses WHERE voter_id ='$username' AND Voters.address_id = Addresses.address_id";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    }else{
        $query="SELECT * FROM Managers, Addresses WHERE manager_id ='$username' AND Managers.address_id = Addresses.address_id";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    }

    $arr = array();
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
    }

    # JSON-encode the response
    echo $json_response = json_encode($arr);

}
?>