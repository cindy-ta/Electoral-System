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


    if ($username == "undefined"){
        $username = "";
    }
    if ($first_name == "undefined"){
        $first_name = "";
    }
    if ($last_name == "undefined"){
        $last_name = "";
    }
    if ($government_id == "undefined"){
        $government_id = "";
    }
    if ($zip_code == "undefined"){
        $zip_code = "";
    }


    $arrVoter = array();
    $arr = array();

    $query="SELECT * FROM Voters, Addresses WHERE voter_id LIKE '%$username%' AND first_name LIKE '%$first_name%' AND last_name LIKE '%$last_name%' AND government_id LIKE '%$government_id%' AND zip_code LIKE '%$zip_code%' AND Voters.address_id = Addresses.address_id  ";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        $arrVoter[] = $rs;
        $arr[] = $rs;
    }

    $arrManager = array();
    $query="SELECT * FROM Managers, Addresses WHERE manager_id LIKE '%$username%' AND first_name LIKE '%$first_name%' AND last_name LIKE '%$last_name%' AND government_id LIKE '%$government_id%' AND zip_code LIKE '%$zip_code%' AND Managers.address_id = Addresses.address_id ";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        $arrManager[] = $rs;
        $arr[] = $rs;
    }


    if ($user_type == "Voter"){
        echo $json_response = json_encode($arrVoter);
    }
    else if($user_type == "Manager")
    {
        echo $json_response = json_encode($arrManager);
    }else
    {
        echo $json_response = json_encode($arr);
    }

//}
?>