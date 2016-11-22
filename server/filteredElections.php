<?php
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['user_name']) )
{
    $username = $_GET['user_name'];

    $user_type = "Voter";

    $query="SELECT user_type as type FROM Users where username = '$username'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $user_type = $row['type'];
        }
    }else
    {

    }

    $zip_code = 0;

    if($user_type == "Voter")
    {
        $query="SELECT zip_code as zip FROM Addresses where address_id in (select address_id from Voters where voter_id = '$username')";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $zip_code = (int)$row['zip'];
            }
        }
    }else if($user_type == "Manager")
    {
        $query="SELECT zip_code as zip FROM Addresses where address_id in (select address_id from Managers where manager_id = '$username')";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $zip_code = (int)$row['zip'];
            }
        }
    }

    $precinctValid = false;
    $countyValid = false;
    $stateValid = false;

    $precinct_id = 1;

    $query="SELECT precinct_id as id FROM Precincts where zipcode_start <= '$zip_code' and zipcode_end >= '$zip_code'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $precinct_id = (int)$row['id'];
            $precinctValid = true;
        }
    }

    $county_id = 1;

    $query="SELECT county_id as id FROM County_Precinct_Relations where precinct_id = '$precinct_id'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $county_id = (int)$row['id'];
            $countyValid = true;
        }
    }

    $state_id = 1;

    $query="SELECT state_id as id FROM State_County_Relations where county_id = '$county_id'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $state_id = (int)$row['id'];
            $stateValid = true;
        }
    }


    $query="SELECT * FROM Elections";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    $arr = array();
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $level = $row['level'];
            $election_id = $row['election_id'];
            if($level == "Country" && $stateValid)
            {
                $query2="SELECT link_id as id FROM Links where sublevel = '$state_id' and election_id = '$election_id'";
                $result2 = $mysqli->query($query2) or die($mysqli->error.__LINE__);

                if($result2->num_rows > 0) {
                    while($row2 = $result2->fetch_assoc()) {
                        $link_id = (int)$row2['id'];
                        $new = array();
                        $new[0] = $row;
                        $new[1] = $link_id;
                        $arr[] = $new;
                    }
                }

            }else if($level == "State" && $countyValid)
            {
                $query2="SELECT link_id as id FROM Links where sublevel = '$county_id' and election_id = '$election_id'";
                $result2 = $mysqli->query($query2) or die($mysqli->error.__LINE__);

                if($result2->num_rows > 0) {
                    while($row2 = $result2->fetch_assoc()) {
                        $link_id = (int)$row2['id'];
                        $new = array();
                        $new[0] = $row;
                        $new[1] = $link_id;
                        $arr[] = $new;
                    }
                }

            }else if($precinctValid)
            {
                $query2="SELECT link_id as id FROM Links where sublevel = '$precinct_id' and election_id = '$election_id'";
                $result2 = $mysqli->query($query2) or die($mysqli->error.__LINE__);

                if($result2->num_rows > 0) {
                    while($row2 = $result2->fetch_assoc()) {
                        $link_id = (int)$row2['id'];
                        $new = array();
                        $new[0] = $row;
                        $new[1] = $link_id;
                        $arr[] = $new;
                    }
                }

            }

        }
    }

    # JSON-encode the response
    echo $json_response = json_encode($arr);
}

?>