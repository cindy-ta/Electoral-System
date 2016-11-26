<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['election_id']) && isset($_GET['user_name']) && isset($_GET['user_type'])  )
{
    $user_name = $_GET['user_name'];
    $election_id = $_GET['election_id'];
    $user_type = $_GET['user_type'];

    $precinct_id = 0;
    if($user_type == "Voter")
    {
        $zip_code = 0;
        $query="select zip_code from Addresses where address_id in (select address_id from Voters where voter_id = '$user_name')";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $zip_code = (int)$row['zip_code'];
            }

            $query2="SELECT precinct_id as id FROM Precincts where zipcode_start <= '$zip_code' and zipcode_end >= '$zip_code'";
            $result2 = $mysqli->query($query2) or die($mysqli->error.__LINE__);
            if($result2->num_rows > 0) {
                while($row2 = $result2->fetch_assoc()) {
                    $precinct_id = (int)$row2['id'];
                }
            }else
            {
                echo $json_response = json_encode("1111111111");
                exit();
            }

        }else
        {
            echo $json_response = json_encode("2222222222");
            exit();
        }

    }else if($user_type = "Manager")
    {
        // if Manager
        $query2="SELECT precinct_id as id FROM Precincts where manager_id = '$user_name'";
        $result2 = $mysqli->query($query2) or die($mysqli->error.__LINE__);
        if($result2->num_rows > 0) {
            while($row2 = $result2->fetch_assoc()) {
                $precinct_id = (int)$row2['id'];
            }
        }else
        {
            echo $json_response = json_encode("3333333333");
            exit();
        }

    }


    $isEnabled = 0;
    $query="select isEnabled from Poll_Statuses where precinct_id = '$precinct_id' and election_id = '$election_id'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $isEnabled = (int)$row['isEnabled'];
        }
    }else
    {
        echo $json_response = json_encode("4444444444");
        exit();
    }


    echo $json_response = json_encode($isEnabled);

}
?>