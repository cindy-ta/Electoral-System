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
    $outp = "";
    if ($user_type == "Voter"){
        $query="SELECT * FROM mydb.Voters WHERE voter_id LIKE '%$username%' AND first_name LIKE '%$first_name%' AND last_name LIKE '%$last_name%' AND government_id LIKE '%$government_id%' ";


        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

        while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            if ($outp != "") {$outp .= ",";}
            $outp .= '{ Voter ID: "'  . $rs["voter_id"] . '", ';
            $outp .= 'First Name: "'  . $rs["first_name"] . '", ';
            $outp .= 'Last Name :"'   . $rs["last_name"]        . '", ';
            $outp .= 'Government ID :"'. $rs["government_id"]     . '" } ';
        }
    }
    else{ //if($user_type == false){
        $query="SELECT * FROM Managers WHERE manager_id LIKE '%$username%' AND first_name LIKE '%$first_name%' AND last_name LIKE '%$last_name%' AND government_id LIKE '%$government_id%' ";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

        while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            if ($outp != "") {$outp .= ",";}
            $outp .= '{ Manager ID: "'  . $rs["manager_id"] . '", ';
            $outp .= 'First Name: "'  . $rs["first_name"] . '", ';
            $outp .= 'Last Name :"'   . $rs["last_name"]        . '", ';
            $outp .= 'Government ID :"'. $rs["government_id"]     . '" } ';
        }
    }

    //$outp = "";
    /*while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($outp != "") {$outp .= ",";}
        $outp .=  '{"First Name:"'  . $rs["first_name"] . '", ';
        $outp .= 'Last Name:"'   . $rs["last_name"] . '", ';
        $outp .= 'Government ID:"'. $rs["government_id"] . ' "}';
    }*/

    /*while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{ First Name: "'  . $rs["first_name"] . '", ';
        $outp .= 'Last Name :"'   . $rs["last_name"]        . '", ';
        $outp .= 'Government ID :"'. $rs["government_id"]     . '" } ';
    }*/


    $outp ='RESULTS: [  '.$outp.'  ]';

    if($result->num_rows > 0) {
        $success = 1111;
    }

    //echo $json_response = json_encode($result);
    echo($outp);

//}
?>